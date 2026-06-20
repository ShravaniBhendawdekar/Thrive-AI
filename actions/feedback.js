'use server';

import { db } from '@/lib/prisma';

/**
 * Retrieves all feedback entries for a given interview (mock) ID.
 *
 * @param {string} interviewId - The mock interview ID (stored in `mockIdRef`)
 * @returns {Promise<Array>} - Array of user answer objects (feedback)
 * @throws Will throw an error if the database query fails.
 */
export async function getFeedback(interviewId) {
  try {
    const feedbacks = await db.userAnswer.findMany({
      where: { mockIdRef: interviewId },
      orderBy: { createdAt: 'asc' } // Adjust the ordering as needed
    });
    return feedbacks;
  } catch (error) {
    console.error("Error fetching feedback:", error);
    throw error;
  }
}
