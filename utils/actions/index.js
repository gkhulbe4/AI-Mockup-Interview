"use server";

import moment from "moment";
import { MockInterview } from "../schema";
import db from "@/utils/db";
import { v4 as uuidv4 } from "uuid";

export async function addInterview(
  jsonResponse,
  jobDesc,
  jobExperience,
  jobPosition,
  userEmail
) {
  const res = await db
    .insert(MockInterview)
    .values({
      mockId: uuidv4(),
      jsonMockResp: jsonResponse,
      jobDesc: jobDesc,
      jobExperience: jobExperience,
      jobPosition: jobPosition,
      createdBy: userEmail,
      createdAt: moment().format("DD-MM-yyyy"),
    })
    .returning({ mockId: MockInterview.mockId });
  return res;
}
