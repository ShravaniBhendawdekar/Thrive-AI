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
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { saveMockInterview } from "@/actions/mock-interview";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const inputPrompt = `
You are an AI assistant that generates mock interview questions and answers.

Given the following job details:
- Job Position: ${jobPosition}
- Job Description: ${jobDescription}
- Years of Experience: ${jobExperience}

Generate exactly ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions and answers.

Respond ONLY in valid JSON array format with NO explanations, markdown, or comments. Avoid wrapping the output with backticks or triple quotes.

Example format:
[
  {
    "question": "What is your experience with React?",
    "answer": "I have 3 years of experience using React to build scalable web apps."
  },
  ...
]
`;

    try {
      const result = await chatSession.sendMessage(inputPrompt);
      const responseText = await result.response.text();

      // Extract JSON array using a more reliable method
      const startIndex = responseText.indexOf("[");
      const endIndex = responseText.lastIndexOf("]");

      if (startIndex === -1 || endIndex === -1) {
        throw new Error("Could not find a valid JSON array in the AI response.");
      }

      const jsonResponsePart = responseText.slice(startIndex, endIndex + 1);
      console.log("Raw AI response text:", responseText);
      console.log("Extracted JSON part:", jsonResponsePart);

      const mockResponse = JSON.parse(jsonResponsePart.trim());
      setJsonResponse(mockResponse);

      const jsonString = JSON.stringify(mockResponse);

      const savedMock = await saveMockInterview({
        jsonString,
        jobPosition,
        jobDescription,
        jobExperience,
      });

      router.push(`/interview/agent/${savedMock.mockId}`);
    } catch (error) {
      console.error("Error generating interview or saving to DB:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-start mt-6">
      <div
        className="w-[300px] h-[200px] p-4 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all flex items-center justify-center"
        onClick={() => setOpenDialog(true)}
      >
        <h1 className="font-bold text-lg text-center text-primary">+ Add New</h1>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              Tell us more about your job Interviewing
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <form onSubmit={onSubmit}>
              <div>
                <div className="mt-4 my-3">
                  <label className="block mb-2 font-medium">Job Role/Job Position</label>
                  <Input
                    placeholder="Ex. Full Stack Developer"
                    required
                    onChange={(e) => setJobPosition(e.target.value)}
                  />
                </div>
                <div className="my-3">
                  <label className="block mb-2 font-medium">Job Description/Tech Stack (In short)</label>
                  <Textarea
                    placeholder="Ex. React, Angular, NodeJs, MySql etc"
                    required
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>
                <div className="my-3">
                  <label className="block mb-2 font-medium">Years of Experience</label>
                  <Input
                    placeholder="Ex. 5"
                    type="number"
                    min="0"
                    max="70"
                    required
                    onChange={(e) => setJobExperience(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-5 justify-end">
                <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin mr-2" /> Generating from AI
                    </>
                  ) : (
                    'Start Interview'
                  )}
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
