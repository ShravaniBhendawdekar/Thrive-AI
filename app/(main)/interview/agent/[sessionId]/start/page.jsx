import { getInterviewDetails } from "@/actions/start-interview";
import ClientInterviewUI from "./_components/ClientInterviewUI";

export default async function StartInterviewPage({ params }) {
  const { sessionId } = await params;

  const interviewData = await getInterviewDetails(sessionId);

  if (!interviewData) {
    return <div>Interview not found.</div>;
  }

  return <ClientInterviewUI interviewData={interviewData} />;
}
