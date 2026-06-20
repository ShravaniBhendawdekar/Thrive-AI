import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const InterviewItemCard = ({ interview }) => {
  const router = useRouter();

  const onStart = () => {
    router.push('/interview/agent/' + interview?.mockId);
  };

  const onFeedbackPress = () => {
    router.push('/interview/agent/' + interview?.mockId + "/feedback");
  };

  // Convert createdAt to a string using toLocaleString.
  // This ensures that if createdAt is a Date object or valid date string,
  // it will render as a friendly string and avoid React hydration errors.
  const createdAt = interview?.createdAt
    ? new Date(interview.createdAt).toLocaleString()
    : "N/A";

  return (
    <div className="border shadow-sm rounded-md p-4 w-[300px]  max-w-md bg-background">
      <h2 className="font-bold text-primary text-lg">{interview?.jobPosition}</h2>
      <p className="text-sm text-muted-foreground">{interview?.jobExperience}</p>
      <p className="text-xs text-muted-foreground mt-1">Created At: {createdAt}</p>

      <div className="flex justify-start gap-3 mt-4">
        <Button variant="outline" onClick={onFeedbackPress}>
          Feedback
        </Button>
        <Button onClick={onStart}>
          Start
        </Button>
      </div>
    </div>
  );
};

export default InterviewItemCard;
