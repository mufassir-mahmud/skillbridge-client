"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import CreateProjectWizard from "@/components/dashboard/client/CreateProjectWizard";

export default function NewProjectPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handlePublish = async (formData) => {
    if (!session?.user) {
      alert("You must be logged in to post a project.");
      return;
    }

    const projectPayload = {
      ...formData,
      clientId: session.user.id,
      clientName: session.user.name,
      clientEmail: session.user.email,
      status: "active",
      createdAt: new Date(),
    };

    console.log("Project Payload:", projectPayload);

    // API integration will be added later.
  };

  if (isPending) {
    return (
      <div className="p-10 text-center text-zinc-500">
        Loading session...
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <CreateProjectWizard onPublish={handlePublish} />
    </div>
  );
}