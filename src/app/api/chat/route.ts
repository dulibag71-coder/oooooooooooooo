import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
        }

        const apiKey = process.env.OPENROUTER_API_KEY;
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
        const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'AI Golf Swing Tech';

        if (!apiKey) {
            console.error('OPENROUTER_API_KEY is not configured');
            return NextResponse.json({ error: 'API configuration error' }, { status: 500 });
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
                "messages": [
                    {
                        "role": "system",
                        "content": "당신은 전문 PGA 골프 코치이자 스윙 분석 전문가입니다. 사용자의 질문에 대해 전문적이고 친절하게 답변해 주세요. 기술적인 조언, 연습 방법, 장비 추천 등 골프에 관한 모든 것에 대해 도움을 줄 수 있습니다. 답변은 한국어로 작성해 주세요."
                    },
                    ...messages.map((m: any) => ({
                        role: m.role,
                        content: m.content
                    }))
                ]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('OpenRouter API Error:', data);
            return NextResponse.json({ error: 'Failed to get AI response' }, { status: response.status });
        }

        return NextResponse.json({
            content: data.choices[0].message.content
        });

    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json({ error: 'Internal server error during chat' }, { status: 500 });
    }
}
