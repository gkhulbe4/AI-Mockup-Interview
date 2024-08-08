import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "../dashboard/_components/InterviewList";
import { initialProfile } from "@/utils/initialProfile";
import db from "@/utils/db";
import { eq } from "drizzle-orm";
import * as schema from "@/utils/schema";

async function Dashboard() {
  const profile = await initialProfile();
  // console.log(profile);

  const getCoins = await db.query.UserCoins.findFirst({
    where: eq(schema.UserCoins.userId, profile.userId),
  });
  // console.log(coins);

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Dashboard</h2>
      <h2 className="text-gray-500">
        Create and start you AI Mockup Interview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview coins={getCoins ? getCoins.numberOfCoins : 0} />
      </div>
      <InterviewList />
    </div>
  );
}

export default Dashboard;
