"use server";
import { MockInterview, UserAnswer, UserCoins } from "../schema";
import db from "@/utils/db";
import { v4 as uuidv4 } from "uuid";
import { and, desc, eq, sql } from "drizzle-orm";

export async function addInterview(
  jsonResponse,
  jobDesc,
  jobExperience,
  jobPosition,
  userId
) {
  const res = await db
    .insert(MockInterview)
    .values({
      mockId: uuidv4(),
      jsonMockResp: jsonResponse,
      jobDesc: jobDesc,
      jobExperience: jobExperience,
      jobPosition: jobPosition,
      createdBy: userId,
    })
    .returning({ mockId: MockInterview.mockId });

  const updateCoins = await db
    .update(UserCoins)
    .set({
      numberOfCoins: sql`${UserCoins.numberOfCoins} - 1`,
      updatedAt: new Date(),
    })
    .where(eq(UserCoins.userId, userId));

  return res;
}

export async function getInterviewData(mockId) {
  const result = await db
    .select()
    .from(MockInterview)
    .where(eq(MockInterview.mockId, mockId));
  return result[0];
}

export async function insertUserAnswer(
  mockId,
  question,
  answer,
  userAnswer,
  feedback,
  rating,
  userId
) {
  const checkAns = await db
    .select()
    .from(UserAnswer)
    .where(
      and(eq(question, UserAnswer.question), eq(mockId, UserAnswer.mockId))
    );
  if (checkAns.length > 0) {
    const result = await db
      .update(UserAnswer)
      .set({ userAns: userAnswer })
      .where(
        and(eq(question, UserAnswer.question), eq(mockId, UserAnswer.mockId))
      )
      .returning({ userAnswer: UserAnswer.userAns });
    return result;
  }
  const result = await db
    .insert(UserAnswer)
    .values({
      mockId: mockId,
      question: question,
      correctAns: answer,
      userAns: userAnswer,
      feedback: feedback,
      rating: rating,
      userId: userId,
    })
    .returning({ userAnswer: UserAnswer.userAns });
  return result;
}

export async function getInterviewList(userId) {
  const result = await db
    .select()
    .from(MockInterview)
    .where(eq(MockInterview.createdBy, userId))
    .orderBy(desc(MockInterview.id));
  return result;
}

export async function doneInterview(mockId) {
  await db
    .update(MockInterview)
    .set({ done: true })
    .where(eq(MockInterview.mockId, mockId));
}
