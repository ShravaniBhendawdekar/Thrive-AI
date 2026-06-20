// /app/actions/start-interview.js
'use server'

import { db } from "@/lib/prisma";

export async function getInterviewDetails(sessionId) {
  if (!sessionId) return null;

  try {
    const interview = await db.mockInterview.findUnique({
      where: {
        mockId: sessionId,
      },
    });

    if (!interview?.jsonMockResp) return null;

    return {
      ...interview,
      jsonMockResp: JSON.parse(interview.jsonMockResp), // Parse the questions stored in JSON
    };
  } catch (error) {
    console.error("Error fetching interview details:", error);
    return null;
  }
}
