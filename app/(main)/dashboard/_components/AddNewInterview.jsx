"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/geminiAiModel";
import { LoaderCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { addInterview } from "@/utils/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function AddNewInterview({ coins }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const inputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}, Depends on Job Position, Job Description & Years of Experience give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} Interview question along with Answer in JSON format, Give us question and answer field on JSON. Please only provide the json. I dont want anything other than the json.`;
    const result = await chatSession.sendMessage(inputPrompt);
    const mockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    // console.log(mockJsonResp);

    setJsonResponse(mockJsonResp);
    if (mockJsonResp) {
      const res = await addInterview(
        mockJsonResp,
        jobDesc,
        jobExperience,
        jobPosition,
        user.id
      );
      // console.log(res);
      if (res) {
        setOpenDialog(false);
        router.push(`/dashboard/interview/${res[0].mockId}`);
      }
    } else {
      toast.error("An error occurred");
    }

    setLoading(false);
    // console.log(JSON.parse(mockJsonResp));
  }
  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => {
          if (coins > 0) {
            setOpenDialog(true);
          } else {
            toast.error("You dont have enough coins. Please buy them");
          }
        }}
      >
        <h2 className="font-medium text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              Tell us more about your job interviewing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add details about your Job position/Role , Job description
                    and Years of experience
                  </h2>
                  <div className="mt-7 my-3">
                    <label> Job Role / Job Position</label>
                    <Input
                      required
                      className="outline-none"
                      placeholder="Ex. Full Stack Web Developer"
                      value={jobPosition}
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>
                  <div className="mt-7 my-3">
                    <label> Job Description / Tech Stack (in short)</label>
                    <Textarea
                      required
                      className="outline-none resize-none"
                      placeholder="Ex. React, Node, Next js, My SQL etc"
                      value={jobDesc}
                      onChange={(e) => setJobDesc(e.target.value)}
                    />
                  </div>
                  <div className="mt-7 my-3">
                    <label>Years of experience</label>
                    <Input
                      required
                      min="0"
                      max="15"
                      type="number"
                      className="outline-none resize-none"
                      placeholder="Ex. 5"
                      value={jobExperience}
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    disabled={loading}
                    variant={"ghost"}
                    onClick={() => {
                      setOpenDialog(false);
                      setJobDesc("");
                      setJobExperience("");
                      setJobPosition("");
                    }}
                  >
                    Close
                  </Button>
                  <Button disabled={loading} variant={"myBtn"} type="submit">
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" /> Creating
                        Interview
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
