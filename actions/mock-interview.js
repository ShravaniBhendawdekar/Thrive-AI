'use server';

import { db } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

export const saveMockInterview = async ({ jsonString, jobPosition, jobDescription, jobExperience }) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  // Ensure user exists in your own DB
  let dbUser = await db.user.findUnique({ where: { clerkUserId: user.id } });

  if (!dbUser) {
    dbUser = await db.user.create({
      data: { clerkUserId: user.id },
    });
  }

  const newMock = await db.mockInterview.create({
    data: {
      mockId: uuidv4(),
      jsonMockResp: jsonString,
      jobPosition,
      jobDesc: jobDescription,
      jobExperience,
      createdBy: user.primaryEmailAddress?.emailAddress || "",
      createdAt: new Date(), // Or: new Date().toISOString()
      userId: dbUser.id,
    },
  });

  return newMock;
};
