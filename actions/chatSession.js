'use server';

import { db } from '@/lib/prisma';

export async function createChatSession(userId, title = 'New Chat') {
  const session = await db.chatSession.create({
    data: {
      userId,
      title,
    },
  });
  return session;
}

export async function saveChatMessage(sessionId, content, role) {
  if (!sessionId) {
    throw new Error('Session ID is missing when saving a message.');
  }

  const message = await db.chatMessage.create({
    data: {
      content,
      role,
      session: {
        connect: { id: sessionId },  // ✅ Correct way to link the session
      },
    },
  });

  return message;
}

export async function getChatSessionMessages(sessionId) {
  const messages = await db.chatMessage.findMany({
    where: { sessionId },
    orderBy: { createdAt: 'asc' },
  });
  return messages;
}

export async function getAllChatSessions(userId) {
  const sessions = await db.chatSession.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
  return sessions;
}
