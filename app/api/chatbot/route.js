import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import removeMarkdown from 'remove-markdown'; // ✅ Import this

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { messages } = await request.json();
    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid payload: messages must be an array' },
        { status: 400 }
      );
    }

    // 1️⃣ Start the chat as before
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const chat = model.startChat({
      history: messages.map((m) => ({
        role: m.role,
        parts: [{ text: m.content }],
      })),
    });

    // 2️⃣ Get the assistant’s main answer
    const latestUserMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(latestUserMessage);
    const rawResponse = result.response.text();
    const cleanResponse = removeMarkdown(rawResponse);

    // 3️⃣ Generate 3 follow-up question suggestions
    const followPrompt = `
Here’s the assistant’s answer:
${cleanResponse}

Please suggest exactly three short, clear follow-up questions the user might ask next, each on its own line, like:
1. …
2. …
3. …
`;
    const followResult = await chat.sendMessage(followPrompt);
    const rawFollow = followResult.response.text();
    // strip any leftover markdown bullets/numbers
    const cleanFollow = removeMarkdown(rawFollow);
    const followUpMessages = cleanFollow
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l);

    // 4️⃣ Return both
    return NextResponse.json({
      response: cleanResponse,
      followUps: followUpMessages,    // array of 3 suggestion strings
    });
  } catch (err) {
    console.error('Error in /api/chatbot:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
