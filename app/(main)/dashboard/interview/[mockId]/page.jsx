import db from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";
import WebcamComponent from "../../_components/WebcamComponent";
import { Lightbulb } from "lucide-react";
import StartInterviewButton from "@/app/(main)/dashboard/_components/StartInterviewButton";

async function Interview({ params }) {
  if (!params.mockId) {
    return redirect("/dashboard");
  }

  const result = await db
    .select()
    .from(MockInterview)
    .where(eq(MockInterview.mockId, params.mockId));
  //   console.log(result[0]);

  if (!result) {
    return redirect("/dashboard");
  }

  if (result[0].done === true) {
    return redirect(`/dashboard/interview/${params.mockId}/feedback`);
  }

  return (
    <div className="my-10 flex justify-center flex-col items-center">
      <h2 className="font-extrabold text-2xl">Let's Get Started</h2>
      <div className="grid gird-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col">
          <div className="flex flex-col my-6 gap-5 rounded-lg border p-4">
            <div className="flex gap-2">
              <h2 className="font-bold text-lg">
                Job Description / Job Position :{" "}
              </h2>
              <h2>{result[0]?.jobPosition}</h2>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold text-lg">
                Job Description / Job Position :{" "}
              </h2>
              <h2>{result[0]?.jobDesc}</h2>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold text-lg">Years of Experience : </h2>
              <h2>{result[0]?.jobExperience}</h2>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-5 rounded-lg border border-yellow-300 bg-yellow-100">
            <h1 className="flex gap-2 font-bold text-yellow-500">
              <Lightbulb />
              Information
            </h1>
            <p className="text-yellow-500">
              Enable Video Web Cam and Microphone to Start your Al Generated
              Mock Interview, It Has 5 question which you can answer and at the
              last you will get the report on the basis of your answer. NOTE: We
              never record your video, Web cam access you can disable at any
              time if you want
            </p>
          </div>
        </div>

        <WebcamComponent />
      </div>
      <div className="flex justify-end items-end w-full mt-5">
        <StartInterviewButton />
      </div>
    </div>
  );
}

export default Interview;
