import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { type, messages, videoData, fileName, userInput } = body;

        const apiKey = process.env.OPENROUTER_API_KEY;
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
        const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'AI Golf Swing Tech';

        if (!apiKey) {
            console.error('OPENROUTER_API_KEY is not configured');
            return NextResponse.json({ error: 'API configuration error' }, { status: 500 });
        }

        let aiMessages = [];

        if (type === 'analyze') {
            if (!videoData) {
                return NextResponse.json({ error: 'No video data provided' }, { status: 400 });
            }
            aiMessages = [
                {
                    role: "system",
                    content: "당신은 사용자의 골프 고민을 진심으로 들어주고 해결해주는 전문 PGA 골프 코치이자 스윙 분석 전문가입니다. 사용자가 털어놓는 고민(userInput)을 최우선으로 경청하고, 그에 공감하며 분석을 진행해 주세요. 1. 셋업 및 자세, 2. 백스윙 및 탑, 3. 다운스윙 및 임팩트, 4. 팔로스루 순서로 분석하며, 마지막에 구체적인 연습 방법 2-3개를 제안해 주세요. 답변은 따뜻하고 전문적인 한국어로 작성해 주세요."
                },
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `아래는 저의 스윙 영상과 제가 현재 가진 고민입니다. 분석 부탁드립니다.\n영상 이름: ${fileName || 'swing_video.mp4'}${userInput ? `\n나의 고민: ${userInput}` : ''}`
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: videoData
                            }
                        }
                    ]
                }
            ];
        } else {
            // Default to chat
            if (!messages || !Array.isArray(messages)) {
                return NextResponse.json({ error: 'Messages are required for chat' }, { status: 400 });
            }
            aiMessages = [
                {
                    role: "system",
                    content: "당신은 골프에 대한 사용자의 모든 고민을 귀 기울여 듣고 따뜻하게 상담해주는 전문 PGA 골프 코치입니다. 단순히 지식을 전달하는 것을 넘어, 사용자가 겪고 있는 막막함이나 어려움에 깊이 공감하며 힘이 되는 조언을 해주세요. 기술적인 상담, 멘탈 관리, 장비 고민 등 모든 골프 관련 고민에 대해 정성껏 답변해 주세요. 답변은 한국어로 작성해 주세요."
                },
                ...messages.map((m: any) => ({
                    role: m.role,
                    content: m.content
                }))
            ];
        }

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "HTTP-Referer": siteUrl,
                "X-Title": siteName,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "google/gemini-2.0-flash-001",
                "messages": aiMessages
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('OpenRouter API Error:', data);
            return NextResponse.json({ error: 'Failed to get AI response' }, { status: response.status });
        }

        const result = data.choices[0].message.content;

        return NextResponse.json(type === 'analyze' ? { analysis: result } : { content: result });

    } catch (error) {
        console.error('Unified AI API Error:', error);
        return NextResponse.json({ error: 'Internal server error during AI processing' }, { status: 500 });
    }
}
