"use client";

import React from "react";
import {
  Briefcase,
  Persons,
  FileText,
  CircleCheck,
  Bookmark,
  Medal,
  Ban,
  CircleExclamation,
} from "@gravity-ui/icons";

import StatCard from "./StatCard";

export const statsByRole = {
  seeker: [
    {
      title: "Applications Sent",
      value: "24",
      description: "Total submitted applications",
      icon: FileText,
      color: "primary",
      trend: "+12%",
    },
    {
      title: "Interviews",
      value: "08",
      description: "Upcoming and completed",
      icon: Persons,
      color: "blue",
      trend: "+8%",
    },
    {
      title: "Saved Jobs",
      value: "16",
      description: "Jobs saved for later",
      icon: Bookmark,
      color: "orange",
    },
    {
      title: "Offers Received",
      value: "03",
      description: "Job offers from recruiters",
      icon: Medal,
      color: "green",
      trend: "+2",
    },
  ],

  recruiter: [
    {
      title: "Total Job Posts",
      value: "42",
      description: "All jobs posted so far",
      icon: Briefcase,
      color: "primary",
      trend: "+15%",
    },
    {
      title: "Total Applicants",
      value: "286",
      description: "Candidates applied to your jobs",
      icon: Persons,
      color: "blue",
      trend: "+18%",
    },
    {
      title: "Active Jobs",
      value: "18",
      description: "Currently accepting applications",
      icon: CircleCheck,
      color: "green",
    },
    {
      title: "Closed Jobs",
      value: "24",
      description: "Completed or expired job posts",
      icon: Ban,
      color: "orange",
    },
  ],

  admin: [
    {
      title: "Total Users",
      value: "2,450",
      description: "Registered platform users",
      icon: Persons,
      color: "primary",
      trend: "+22%",
    },
    {
      title: "Total Job Posts",
      value: "684",
      description: "All published job posts",
      icon: Briefcase,
      color: "blue",
      trend: "+14%",
    },
    {
      title: "Active Jobs",
      value: "328",
      description: "Currently available positions",
      icon: CircleCheck,
      color: "green",
    },
    {
      title: "Pending Reports",
      value: "12",
      description: "Reports waiting for review",
      icon: CircleExclamation,
      color: "orange",
    },
  ],
};

export const roleTitles = {
  seeker: "Job Seeker Overview",
  recruiter: "Recruiter Overview",
  admin: "Platform Overview",
};

/**
 * DashboardStats Component
 *
 * @param {Object} props
 * @param {'seeker' | 'recruiter' | 'admin'} [props.role='seeker'] - Role preset key
 * @param {Array} [props.customStats] - Dynamic stats list override (for live backend API data)
 * @param {boolean} [props.showTitle=false] - Optional section title toggle
 * @param {string} [props.className] - Additional Tailwind classes for section wrapper
 */
export default function DashboardStats({
  role = "seeker",
  customStats,
  showTitle = false,
  className = "",
}) {
  const stats = customStats || statsByRole[role] || statsByRole.seeker;

  return (
    <section className={`space-y-4 ${className}`}>
      {showTitle && (
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {roleTitles[role] || "Overview"}
        </h2>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 w-full">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
    </section>
  );
}