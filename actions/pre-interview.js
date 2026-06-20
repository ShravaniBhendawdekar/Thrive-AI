'use server'
import { db } from "@/lib/prisma";

export async function getPreInterviewData(sessionId) {
  if (!sessionId) return null;

  try {
    const interview = await db.mockInterview.findUnique({
      where: {
        mockId: sessionId,
      },
    });
    return interview;
  } catch (error) {
    console.error("Error fetching pre-interview data:", error);
    return null;
  }
}
