import React from "react";
import { Coins } from "lucide-react";
import db from "@/utils/db";
import BuyButton from "./BuyButton";

async function PriceCards() {
  const result = await db.query.Plan.findMany({
    columns: {
      coins: true,
      id: true,
      price: true,
      title: true,
    },
  });
  // console.log(result);

  return (
    <div className="mx-auto w-max px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
        {result.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-2xl ${
              plan.title === "Basic"
                ? "border border-gray-200"
                : "border-[2px] border-blue-500"
            } p-6 shadow-sm sm:px-8 lg:p-12 cursor-pointer `}
          >
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900">
                {plan.title}
              </h2>

              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  {" "}
                  {plan.price / 100}${" "}
                </strong>
              </p>
            </div>

            <ul className="mt-6 space-y-2">
              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>

                <span className="text-gray-700 flex justify-center items-center gap-1">
                  {" "}
                  Get {plan.coins} <Coins color="#fed500" height={20} />
                </span>
              </li>
            </ul>

            <BuyButton planId={plan.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PriceCards;
