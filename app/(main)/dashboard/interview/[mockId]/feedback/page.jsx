import db from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq, sql } from "drizzle-orm";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";

function ratingColor(rating) {
  if (rating >= 0 && rating <= 4) {
    return "text-red-500";
  } else if (rating >= 5 && rating <= 7) {
    return "text-yellow-500";
  } else {
    return "text-green-600";
  }
}

async function Feedback({ params }) {
  const result = await db
    .select()
    .from(UserAnswer)
    .where(eq(UserAnswer.mockId, params.mockId))
    .orderBy(UserAnswer.id);
  if (result.length === 0) {
    return <div className="text-2xl font-bold"> No Feedback is found</div>;
  }
  // console.log(result);

  const rating = await db
    .select({
      rating: sql`avg(CAST(${UserAnswer.rating} AS INTEGER))`,
    })
    .from(UserAnswer)
    .groupBy(params.mockId);
  // console.log(rating);
  return (
    <div>
      <h1 className="text-3xl text-green-500 font-bold">Congratulations!</h1>
      <h1 className="text-2xl font-bold">Here is your interview feedback</h1>
      <h1 className={`text-md text-blue-500 my-3 font-semibold`}>
        Your overall interview rating is:
        <span className={`ml-2 ${ratingColor(parseFloat(rating[0].rating))}`}>
          {parseFloat(rating[0].rating)}
        </span>
      </h1>
      <h1 className="text-sm text-gray-500">
        Find below your answer along with the feedback and the rating
      </h1>
      {result?.length > 0 && (
        <div className="flex flex-col gap-3">
          {result.map((r, index) => (
            <Collapsible key={index}>
              <CollapsibleTrigger className="flex justify-between items-center gap-2 p-2 bg-secondary rounded-lg my-2 text-left w-full">
                {r.question} <ChevronsUpDown className="h-4 w-5" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2">
                  <h2 className=" p-2 border rounded-lg font-bold text-gray-700 text-sm">
                    Rating:{" "}
                    <span
                      className={`${ratingColor(
                        parseInt(r.rating)
                      )} ml-1 font-normal`}
                    >
                      {r.rating}
                    </span>
                  </h2>
                  <h2 className="p-2 border rounded-lg font-bold bg-red-50 text-red-500 text-sm">
                    User Answer:
                    <span className="ml-1 font-normal">{r.userAns}</span>
                  </h2>
                  <h2 className="p-2 border rounded-lg font-bold bg-green-50 text-green-600 text-sm">
                    Correct Answer:
                    <span className="ml-1 font-normal">{r.correctAns}</span>
                  </h2>
                  <h2 className="p-2 border rounded-lg font-bold bg-blue-50 text-blue-500 text-sm">
                    Feedback :
                    <span className="ml-1 font-normal">{r.feedback}</span>
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      )}
      <div className="mt-4">
        <Link
          className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-md text-sm "
          href="/dashboard"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default Feedback;
