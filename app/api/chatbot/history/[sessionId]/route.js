// app/api/chatbot/history/[sessionId]/route.js
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const { sessionId } = params;

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    const messages = await db.chatMessage.findMany({
      where: {
        sessionId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Error retrieving chat history:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
