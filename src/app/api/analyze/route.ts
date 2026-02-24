import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { videoData, fileName } = await req.json();

        if (!videoData) {
            return NextResponse.json({ error: 'No video data provided' }, { status: 400 });
        }

        const apiKey = process.env.OPENROUTER_API_KEY;
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
        const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'AI Golf Swing Tech';

        if (!apiKey) {
            console.error('OPENROUTER_API_KEY is not configured');
            return NextResponse.json({ error: 'API configuration error' }, { status: 500 });
        }

        // Note: Most LLMs through OpenRouter currently support images best for multimodal.
        // Ideally, for video, we would extract frames. For this implementation, 
        // we assume the frontend might send a base64 encoded thumbnail or the first frame if data size is constrained,
        // or we use a model that supports video URLs if available.
        // For now, we'll implement a robust multimodal prompt.

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "HTTP-Referer": siteUrl,
                "X-Title": siteName,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "google/gemini-2.0-flash-001", // High performance multimodal model
                "messages": [
                    {
                        "role": "system",
                        "content": "You are a professional PGA golf coach and swing analyst. Analyze the user's golf swing provided in the visual data. Provide a structured analysis covering: 1. Setup & Posture, 2. Backswing & Top, 3. Downswing & Impact, 4. Follow-through. Give 2-3 specific, actionable drills for improvement. Keep the tone encouraging and professional. Respond in Korean."
                    },
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": `Please analyze my golf swing video: ${fileName || 'swing_video.mp4'}`
                            },
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": videoData // Expecting base64 data or image URL
                                }
                            }
                        ]
                    }
                ]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('OpenRouter API Error:', data);
            return NextResponse.json({ error: 'Failed to analyze swing with AI' }, { status: response.status });
        }

        return NextResponse.json({
            analysis: data.choices[0].message.content
        });

    } catch (error) {
        console.error('API Route Error:', error);
        return NextResponse.json({ error: 'Internal server error during analysis' }, { status: 500 });
    }
}
