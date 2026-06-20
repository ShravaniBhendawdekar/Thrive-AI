'use server';

import { db } from '@/lib/prisma'; // Adjust this path if needed

export async function getInterviewHistory(email) {
  if (!email) return [];

  try {
    const result = await db.mockInterview.findMany({
      where: {
        createdBy: email,
      },
      orderBy: {
        id: 'desc',
      },
    });

    return result;
  } catch (error) {
    console.error("Failed to fetch interview history:", error);
    return [];
  }
}
