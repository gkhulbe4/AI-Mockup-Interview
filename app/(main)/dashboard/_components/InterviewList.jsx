"use client";
import { getInterviewList } from "@/utils/actions";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import InterviewCard from "./InterviewCard";

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  async function getPrevInterview() {
    if (!user) return;
    // console.log(user.id);
    const result = await getInterviewList(user?.id);
    setInterviewList(result);
  }

  useEffect(() => {
    getPrevInterview();
  }, [user]);

  return (
    <div>
      <h2 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {interviewList?.length > 0 &&
          interviewList?.map((interview, index) => (
            <InterviewCard interview={interview} />
          ))}
      </h2>
    </div>
  );
}

export default InterviewList;
