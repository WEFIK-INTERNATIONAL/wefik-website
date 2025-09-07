import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
    try {
        const body = await req.json();
        const { messages } = body;

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: "Invalid request. Messages are required." },
                { status: 400 }
            );
        }

        const apiKey = process.env.GOOGLE_API_KEY;
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        const payLoad = {
            contents: messages.map((msg) => ({
                role: msg.role,
                parts: [{ text: msg.text }],
            })),
            systemInstruction: {
                parts: [
                    {
                        text: `Your name is Neon. 
You are a support assistant for a web design agency called 'WEFIK'.
Always introduce yourself as Neon, and respond in a friendly, professional way.

Your goal is to answer questions based ONLY on the following information. Do not use any external knowledge.

                        --- START OF KNOWLEDGE BASE ---

                        **About Us:**
                        - We are a creative web agency specializing in building beautiful, high-performance websites.
                        - We were founded in 2021.
                        - Our team is fully remote, with members across the globe.

                        **Services:**
                        - Web Design & Development: We create custom websites using technologies like React and Next.js.
                        - Branding & Identity: We help businesses create a strong brand presence.
                        - SEO & Marketing: We optimize websites to rank higher on search engines.

                        **Contact Information:**
                        - You can get in touch through the 'Contact' page on our website. We do not provide a direct email or phone number via this chat.

                        --- END OF KNOWLEDGE BASE ---

                        **Your Rules:**
                        1. ONLY answer questions using the information from the 'KNOWLEDGE BASE' above.
                        2. If the user asks a question that cannot be answered from the provided information, politely decline.
                        3. A good response for out-of-scope questions: 
                        "I can only answer questions related to WEFIK services. How can I help you with our web design, branding, or SEO services?"
                        4. Be friendly and professional.`,
                    },
                ],
            },
        };

        const response = await axios.post(apiUrl, payLoad, {
            headers: { "Content-Type": "application/json" },
        });

        const result = response.data;
        const botResponse =
            result.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Sorry, I couldn't generate a response.";

        return NextResponse.json({ text: botResponse });
    } catch (error) {
        console.log("Chat Api Error: ", error);

        if (error.response) {
            return NextResponse.json(
                {
                    error: `Google API error: ${error.response.statusText}`,
                    details: error.response.data,
                },
                {
                    status: error.response.status,
                }
            );
        }

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
