// /app/actions/save-user-answer.js
'use server';

import { db } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import moment from 'moment';

export const saveUserAnswer = async ({
  mockId,
  question,
  correctAns,
  userAns,
  feedback,
  rating,
  userEmail,
}) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    // Ensure user exists in your own DB
    let dbUser = await db.user.findUnique({ where: { clerkUserId: user.id } });
    if (!dbUser) {
      dbUser = await db.user.create({
        data: { 
          clerkUserId: user.id, 
          email: user.primaryEmailAddress?.emailAddress || '' 
        },
      });
    }

    // Save the user answer using Prisma's create method.
    const newUserAnswer = await db.userAnswer.create({
      data: {
        mockIdRef: mockId,
        question,
        correctAns,
        userAns,
        feedback,
        rating: parseInt(rating), // Ensure rating is the correct type (e.g., Int if using number)
        userEmail,
        createdAt: new Date().toISOString(), // ISO-8601 format
      },
    });

    return { success: true, data: newUserAnswer };
  } catch (error) {
    console.error("Error saving user answer:", error);
    return { success: false, error: error.message };
  }
};
