"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCam } from "@/hooks/camStore";
import { useParams } from "next/navigation";
import Link from "next/link";

function StartInterviewButton() {
  const params = useParams();
  const { cam } = useCam((state) => ({
    cam: state.cam,
  }));
  return (
    <div>
      {cam ? (
        <Link href={`/dashboard/interview/${params.mockId}/start`}>
          <Button variant={"myBtn"}>Start Interview</Button>
        </Link>
      ) : (
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger>
              <Button disabled={true} variant={"myBtn"}>
                Start Interview
              </Button>
            </TooltipTrigger>
            <TooltipContent>Please Enable Webcam</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}

export default StartInterviewButton;
