import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
  function textToSpeech(text) {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      toast.error("Sorry , Your browser does not support Text to Speech");
    }
  }
  return (
    mockInterviewQuestion && (
      <div className="p-5 border rounded-lg my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestion.map((question, index) => {
            return (
              <div
                className={`p-2  ${
                  activeQuestionIndex === index
                    ? "bg-blue-500 text-white font-medium"
                    : "bg-secondary text-black"
                } rounded-full text-xs md:text-sm text-center`}
                key={index}
              >
                Question {index + 1}
              </div>
            );
          })}
        </div>
        <h2 className="my-5 text-md md:text-lg font-semibold">
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </h2>
        <Volume2
          className="cursor-pointer"
          onClick={() =>
            textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
          }
        />
        <div className="border rounded-lg p-5 bg-blue-100 mt-20">
          <h2 className="flex gap-5 items-center text-blue-500">
            <Lightbulb />
            <strong>Note: </strong>
          </h2>
          <h2 className="text-sm text-blue-500 my-2">
            Click on Record Answer when you want to answer the question. At the
            end of interview we will give you the feedback along with correct
            answer for each of question and your answer to compare it.
          </h2>
        </div>
      </div>
    )
  );
}

export default QuestionsSection;
