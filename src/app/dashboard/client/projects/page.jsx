
"use client";

import React, { useEffect, useState } from "react";
import { getClientProjects } from "@/lib/api/projects";
import { authClient } from "@/lib/auth-client";
import ClientProjectCard from "@/components/dashboard/client/ClientProjectCard";

const ProjectPage = () => {
  const { data: session, isPending } = authClient.useSession();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const clientId = session?.user?.id;

  useEffect(() => {
    if (isPending) return;

    if (!clientId) {
      setProjects([]);
      setLoading(false);
      return;
    }

    const fetchProjects = async () => {
      try {
        setLoading(true);

        const data = await getClientProjects(clientId);

        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [clientId, isPending]);

  if (isPending || loading) {
    return <div className="p-10">Loading projects...</div>;
  }

  return (
    <div>
        <div className='mt-10 ml-10'>
                <p className='text-sm text-[#8661F1] font-semibold'>Client workspace</p>
                <h2 className='my-3 text-2xl font-semibold'>Projects</h2>
                <p className='text-sm text-gray-400'>Manage your SkillBridge experience from one place.</p>
            </div>
            <div className="w-11/12 mx-auto mt-5">
     <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        
  {projects.map((project) => (
    <ClientProjectCard
      key={project._id}
      project={project}
      onView={(project) => console.log("View:", project._id)}
      onEdit={(project) => console.log("Edit:", project._id)}
      onDelete={(id) => console.log("Delete:", id)}
    />
  ))}
</div>
            </div>
         
    </div>
  
  );
};

export default ProjectPage;
