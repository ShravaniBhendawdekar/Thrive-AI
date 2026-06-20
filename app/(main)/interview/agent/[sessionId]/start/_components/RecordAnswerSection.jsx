"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { useUser } from "@clerk/nextjs";
import { saveUserAnswer } from "@/actions/save-user-answer";

const Webcam = dynamic(() => import("react-webcam"), { ssr: false });
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setHasMounted(true); // Ensure component only renders on client
  }, []);

  useEffect(() => {
    setUserAnswer(transcript);
  }, [transcript]);

  useEffect(() => {
    if (!listening && userAnswer.length > 10) {
      console.log("Stopped listening, triggering update...");
      UpdateUserAnswer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listening, userAnswer]);

  const StartStopRecording = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      setUserAnswer("");
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  const UpdateUserAnswer = async () => {
    setLoading(true);

    const questionText = mockInterviewQuestion[activeQuestionIndex]?.question;
    const correctAnswer = mockInterviewQuestion[activeQuestionIndex]?.answer;
    const feedbackPrompt = `Question: ${questionText}, User Answer: ${userAnswer}, Depends on question and user answer for given interview question please give user rating for answer and feedback as area of improvement if any in just 3 to 5 lines in JSON format with keys: rating and feedback`;

    try {
      console.log("Sending feedback prompt:", feedbackPrompt);
      const result = await chatSession.sendMessage(feedbackPrompt);
      const rawText = result.response.text();
      console.log("Ai raw response:", rawText);

      const cleanedJson = rawText
        .replace("```json", "")
        .replace("```", "")
        .trim();

      const JsonfeedbackResp = JSON.parse(cleanedJson);
      console.log("Parsed feedback:", JsonfeedbackResp);

      const payload = {
        mockId: interviewData?.mockId,
        question: questionText,
        correctAns: correctAnswer,
        userAns: userAnswer,
        feedback: JsonfeedbackResp?.feedback,
        rating: JsonfeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      };

      console.log("Sending payload to saveUserAnswer:", payload);

      const response = await saveUserAnswer(payload);

      if (response?.success) {
        toast.success("User Answer recorded successfully ✅");
        resetTranscript();
        setUserAnswer("");
      } else {
        console.error("Failed response from server action:", response);
        toast.error("❌ Failed to record answer: " + response?.error);
      }
    } catch (error) {
      console.error("Error occurred while updating answer:", error);
      toast.error("🚨 Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!hasMounted) return null; // ❗ Prevent SSR mismatch

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex flex-col my-20 justify-center items-center bg-black rounded-lg p-5 relative">
        <Image
          src="/webcam.png"
          width={200}
          height={200}
          alt="webcam"
          priority
          className="absolute"
        />
        <Webcam
          style={{ height: 300, width: "100%", zIndex: 10 }}
          mirrored={true}
        />
      </div>

      {transcript && (
        <div className="bg-muted px-4 py-2 rounded-md text-sm text-center mb-4 max-w-md">
          <strong>Live Transcript:</strong> {transcript}
        </div>
      )}

      <Button
        disabled={loading}
        variant="outline"
        className="my-10"
        onClick={StartStopRecording}
      >
        {listening ? (
          <h2 className="text-red-600 items-center animate-pulse flex gap-2">
            <StopCircle /> Stop Recording...
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
};

export default RecordAnswerSection;
