import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function InterviewCard({ interview }) {
  return (
    <div className="border shadow-sm rounded-lg p-3 ">
      <h2 className="font-bold text-blue-600">{interview?.jobPosition}</h2>
      <h2 className="text-sm text-gray-600">{interview.jobExperience}</h2>
      <h2 className="text-xs text-gray-400">
        created At: {interview.createdAt}
      </h2>
      <div className="flex justify-between mt-2 gap-5">
        <Link
          href={`/dashboard/interview/${interview.mockId}/feedback`}
          className="w-full"
        >
          <Button size="sm" variant="outline" className="w-full font-semibold">
            Feedback
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default InterviewCard;
