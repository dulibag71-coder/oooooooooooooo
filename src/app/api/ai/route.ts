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
                    content: "당신은 전문 PGA 골프 코치이자 스윙 분석 전문가입니다. 사용자의 스윙 영상을 분석하고 피드백을 제공해 주세요. 사용자가 별도로 질문이나 요청사항(userInput)을 입력했다면 그 부분을 중점적으로 답변에 포함해 주세요. 1. 셋업 및 자세, 2. 백스윙 및 탑, 3. 다운스윙 및 임팩트, 4. 팔로스루 순서로 분석하며, 마지막에 구체적인 연습 방법 2-3개를 제안해 주세요. 답변은 한국어로 작성해 주세요."
                },
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `Please analyze my golf swing video: ${fileName || 'swing_video.mp4'}${userInput ? `\n\nUser Specific Question/Instruction: ${userInput}` : ''}`
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
                    content: "당신은 전문 PGA 골프 코치이자 스윙 분석 전문가입니다. 사용자의 질문에 대해 전문적이고 친절하게 답변해 주세요. 기술적인 조언, 연습 방법, 장비 추천 등 골프에 관한 모든 것에 대해 도움을 줄 수 있습니다. 답변은 한국어로 작성해 주세요."
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
