"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResumePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/resume/templates"); // 🔥 Redirect to templates
  }, [router]);

  return null; // ❌ No UI shown
}
