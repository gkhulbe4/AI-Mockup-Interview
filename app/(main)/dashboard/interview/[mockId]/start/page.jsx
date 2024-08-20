"use client";
import { useRouter } from "next/navigation";
import QuestionsSection from "./_components/QuestionsSection";
import { useEffect, useState } from "react";
import { doneInterview, getInterviewData } from "@/utils/actions";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import { useCam } from "@/hooks/camStore";
import { toast } from "sonner";

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setCam, cam } = useCam((state) => ({
    setCam: state.setCam,
    cam: state.cam,
  }));

  useEffect(() => {
    const fetchData = async () => {
      if (!params.mockId) {
        router.push("/dashboard");
      } else {
        if (cam === false) {
          router.push(`/dashboard/interview/${params.mockId}`);
        }
        try {
          setIsLoading(true);
          const res = await getInterviewData(params.mockId);
          // console.log(res);
          if (res.done === true) {
            return router.push(
              `/dashboard/interview/${params.mockId}/feedback`
            );
          }
          setInterviewData(res);
          const json = res.jsonMockResp.replace(/```/g, "");
          console.log(json);
          setMockInterviewQuestion(JSON.parse(json));
          setIsLoading(false);
        } catch (error) {
          toast.error("Error fetching interview data:", error);
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [params.mockId]);
  // console.log(mockInterviewQuestion);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
      </div>
      <div className="flex justify-end gap-6 ">
        {activeQuestionIndex > 0 && (
          <Button
            variant={"myBtn"}
            onClick={() => setActiveQuestionIndex((prev) => prev - 1)}
          >
            Previous Question
          </Button>
        )}
        {activeQuestionIndex !== mockInterviewQuestion?.length - 1 && (
          <Button
            variant={"myBtn"}
            onClick={() => setActiveQuestionIndex((prev) => prev + 1)}
          >
            Next Question
          </Button>
        )}
        {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
          <Button
            variant={"myBtn"}
            onClick={async () => {
              setCam(false);
              await doneInterview(params.mockId);
              router.push(`/dashboard/interview/${params.mockId}/feedback`);
            }}
          >
            End Interview
          </Button>
        )}
      </div>
    </div>
  );
}

export default StartInterview;
