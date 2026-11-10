
"use client";

import React from "react";
import { Button, Chip } from "@heroui/react";
import { Eye, Pencil, Trash2, CalendarDays, Clock, Wallet, BriefcaseBusiness } from "lucide-react";

export default function ClientProjectCard({
  project,
  onView,
  onEdit,
  onDelete,
}) {
  const {
    _id,
    title,
    description,
    skills = [],
    minBudget,
    maxBudget,
    experienceLevel,
    duration,
    deadline,
    status = "active",
  } = project;

  const statusStyles = {
    active: "bg-emerald-50 text-emerald-600 border-emerald-200",
    completed: "bg-blue-50 text-blue-600 border-blue-200",
    draft: "bg-zinc-100 text-zinc-600 border-zinc-200",
    cancelled: "bg-red-50 text-red-600 border-red-200",
  };

  return (
    <div className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:border-purple-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">

        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
            {title || "Untitled Project"}
          </h3>

          <p className="mt-1 text-xs text-zinc-400">
            Project ID: {_id}
          </p>
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${
            statusStyles[status] || statusStyles.draft
          }`}
        >
          {status}
        </span>
      </div>

      {/* Description */}
      <p className="mt-4 line-clamp-3 whitespace-pre-line text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {description || "No project description provided."}
      </p>

      {/* Skills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Chip
            key={`${skill}-${index}`}
            size="sm"
            variant="flat"
            className="bg-purple-50 text-[#8661F1] dark:bg-purple-950/40 dark:text-purple-300"
          >
            {skill}
          </Chip>
        ))}
      </div>

      {/* Project Information */}
      <div className="mt-5 grid grid-cols-2 gap-4 border-y border-zinc-100 py-5 dark:border-zinc-800 sm:grid-cols-4">

        <div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <Wallet size={14} />
            Budget
          </div>
          <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-white">
            ${minBudget || 0} – ${maxBudget || 0}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <BriefcaseBusiness size={14} />
            Experience
          </div>
          <p className="mt-1 text-sm font-semibold capitalize text-zinc-900 dark:text-white">
            {experienceLevel || "Not specified"}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <Clock size={14} />
            Duration
          </div>
          <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-white">
            {duration || "Not specified"}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <CalendarDays size={14} />
            Deadline
          </div>
          <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-white">
            {deadline || "Not specified"}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex flex-wrap items-center justify-end gap-2">

        <Button
          size="sm"
          variant="flat"
          
          onPress={() => onView?.(project)}
        >
            <Eye size={15} />
          View
        </Button>

        <Button
          size="sm"
          variant="flat"
          
          onPress={() => onEdit?.(project)}
        >
            <Pencil size={15} />
          Edit
        </Button>

        <Button
          size="sm"
          color="danger"
          variant="flat"
          
          onPress={() => onDelete?.(_id)}
        >
            <Trash2 size={15} />
          Delete
        </Button>

      </div>
    </div>
  );
}
