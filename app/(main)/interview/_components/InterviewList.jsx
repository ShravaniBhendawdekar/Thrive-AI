"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import InterviewItemCard from "./InterviewItemCard";
import { getInterviewHistory } from "@/actions/showhistory";

const InterviewList = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    if (user) {
      fetchInterviewHistory();
    }
  }, [user]);

  const fetchInterviewHistory = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    const result = await getInterviewHistory(email);
    setInterviewList(result);
  };

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {interviewList &&
          interviewList.map((interview, index) => (
            <InterviewItemCard interview={interview} key={index} />
          ))}
      </div>
    </div>
  );
};

export default InterviewList;
