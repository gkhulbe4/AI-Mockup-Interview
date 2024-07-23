import db from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { WebcamIcon } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
// import Webcam from "react-webcam";

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

  return (
    <div className="my-10 flex justify-center flex-col items-center">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="">
        {/* <Webcam /> */}
        <WebcamIcon className="h-72 w-full my-7 p-2 bg-secondary rounded-lg border" />
      </div>
    </div>
  );
}

export default Interview;
