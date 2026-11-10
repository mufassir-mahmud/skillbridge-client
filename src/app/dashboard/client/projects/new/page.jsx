
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import CreateProjectWizard from "@/components/dashboard/client/CreateProjectWizard";
import { createProject } from "@/lib/actions/projects";
import { toast } from "@heroui/react";

export default function NewProjectPage() {
  const router = useRouter();

  const [wizardKey, setWizardKey] = useState(0);

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

    try {
      const res = await createProject(projectPayload);

      if (res.insertedId) {
        toast.success("Created New Job");

        // Reset CreateProjectWizard
        setWizardKey((prevKey) => prevKey + 1);

        router.push("/dashboard/client");
      }
    } catch (error) {
      console.error("Project creation failed:", error);
      toast.danger("Failed to create project");
    }

    console.log("Project Payload:", projectPayload);
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
      <CreateProjectWizard
        key={wizardKey}
        onPublish={handlePublish}
      />
    </div>
  );
}
