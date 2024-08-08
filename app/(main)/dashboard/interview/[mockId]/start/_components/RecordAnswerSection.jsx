import { Button } from "@/components/ui/button";
import { Mic, StopCircle } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { toast } from "sonner";
import { chatSession } from "@/utils/geminiAiModel";
import { useParams } from "next/navigation";
import { insertUserAnswer } from "@/utils/actions";
import { useUser } from "@clerk/nextjs";
import { useCam } from "@/hooks/camStore";

function RecordAnswerSection({ activeQuestionIndex, mockInterviewQuestion }) {
  const [userAnswer, setUserAnswer] = useState("");
  const { cam } = useCam((state) => ({
    cam: state.cam,
  }));
  // console.log(cam);
  const [loading, setLoading] = useState(false);
  const { isRecording, results, startSpeechToText, stopSpeechToText } =
    useSpeechToText({
      continuous: true,
      useLegacyResults: false,
    });
  const params = useParams();
  const { user } = useUser();

  useEffect(() => {
    if (results.length > 0) {
      setUserAnswer(results[results.length - 1]?.transcript);
    }
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer?.length > 10) {
      saveUserAnswer();
    }
    if (results.length > 0 && userAnswer?.length < 10) {
      setLoading(false);
      toast.error("Error while saving your answer. Please record again");
      return;
    }
  }, [userAnswer]);

  async function startStopRecording() {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  }

  async function saveUserAnswer() {
    setLoading(true);
    const feedbackPrompt = `Please provide a rating out of 10 and a brief feedback (3 to 5 lines) based on the user's answer to the interview question. Here is the information:- Question: ${mockInterviewQuestion[activeQuestionIndex]?.question} , User Answer: ${userAnswer}.Your feedback should depend on both the question and the user's answer. Include areas of improvement if any. Give the result in JSON format with rating field and feedback field. Dont write any thing else. only provide me the json.`;
    const result = await chatSession.sendMessage(feedbackPrompt);
    const mockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    // console.log(mockJsonResp);
    // const json = res.jsonMockResp.replace(/```/g, "");
    const jsonMockResp = JSON.parse(mockJsonResp);
    const res = await insertUserAnswer(
      params.mockId,
      mockInterviewQuestion[activeQuestionIndex]?.question,
      mockInterviewQuestion[activeQuestionIndex]?.answer,
      userAnswer,
      jsonMockResp.feedback,
      parseInt(jsonMockResp.rating),
      user?.id
    );
    console.log(res);
    if (res) {
      toast.success("Answer recorded successfully");
      setLoading(false);
    } else {
      toast.error("An error occurred");
      setUserAnswer("");
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col my-10 justify-center items-center bg-black rounded-lg p-5">
        <Image
          src="/webcam.png"
          width={200}
          height={200}
          alt="webcam"
          className="absolute"
        />
        {cam && (
          <Webcam
            onUserMedia={cam}
            mirrored={true}
            style={{ height: 300, width: "100%", zIndex: 10 }}
          />
        )}
      </div>
      <Button
        disabled={loading}
        variant={"outline"}
        onClick={startStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2">
            <StopCircle /> Stop Recording
          </h2>
        ) : (
          <h2 className="text-blue-500 flex gap-2">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
      <Button onClick={() => console.log(userAnswer)}>Show User answer</Button>
    </div>
  );
}

export default RecordAnswerSection;
