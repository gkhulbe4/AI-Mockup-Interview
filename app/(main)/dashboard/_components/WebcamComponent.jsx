"use client";
import React, { useState } from "react";
import Webcam from "react-webcam";
import { WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCam } from "@/hooks/camStore";

function WebcamComponent() {
  // const [webCamEnabled, setWebCamEnabled] = useState(false);
  const { cam, setCam } = useCam((state) => ({
    cam: state.cam,
    setCam: state.setCam,
  }));
  // console.log(cam);
  return (
    <div className="flex flex-col justify-center items-center">
      {/* <button onClick={() => setCam(true)}>Open</button>
      <button
        onClick={() => {
          console.log(cam);
        }}
      >
        show
      </button> */}
      {cam ? (
        <Webcam
          onUserMedia={cam}
          // onUserMediaError={() => setCam(false)}
          mirrored={true}
          style={{ height: 300, width: 600 }}
        />
      ) : (
        <div className="flex flex-col gap-4 w-full h-max ">
          <div className="bg-secondary rounded-lg border w-full">
            <WebcamIcon className="h-72 w-full p-10" />
          </div>
          <Button variant={"outline"} onClick={() => setCam(true)}>
            Enable Web Cam
          </Button>
        </div>
      )}
    </div>
  );
}

export default WebcamComponent;
