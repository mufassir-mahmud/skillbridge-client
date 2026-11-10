
"use client";

import React, { useState } from "react";
import { Card } from "@heroui/react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ArrowUpFromLine,
  Xmark,
} from "@gravity-ui/icons";

const STEPS = [
  { id: 1, title: "Project basics" },
  { id: 2, title: "Budget & scope" },
  { id: 3, title: "Skills & timing" },
  { id: 4, title: "Review & publish" },
];

const CATEGORIES = [
  "Web Development",
  "UI/UX Design",
  "Mobile Development",
  "DevOps & Cloud",
  "Data Science & AI",
];

const DURATION_OPTIONS = [
  "1–2 months",
  "2–3 months",
  "3–6 months",
  "6+ months",
];

const EXPERIENCE_LEVELS = [
  "Entry level",
  "Intermediate",
  "Expert",
];

export default function CreateProjectWizard({ onPublish }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [skillInput, setSkillInput] = useState("");

  const [formData, setFormData] = useState({
    title: "Senior React Developer for Fintech Dashboard",
    category: "Web Development",
    description:
      "We’re looking for an experienced React developer to build a responsive, data-rich dashboard for our fintech platform.",
    budgetType: "fixed",
    minBudget: "4000",
    maxBudget: "6000",
    experienceLevel: "Expert",
    skills: ["React", "TypeScript", "D3.js"],
    duration: "2–3 months",
    deadline: "2025-06-18",
    files: [],
  });

  const updateFormData = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const handleAddSkill = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();

      if (!formData.skills.includes(skillInput.trim())) {
        updateFormData({
          skills: [...formData.skills, skillInput.trim()],
        });
      }

      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    updateFormData({
      skills: formData.skills.filter(
        (skill) => skill !== skillToRemove
      ),
    });
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files || []);

    if (uploadedFiles.length + formData.files.length > 5) {
      alert("You can upload a maximum of 5 files.");
      return;
    }

    updateFormData({
      files: [...formData.files, ...uploadedFiles],
    });

    e.target.value = "";
  };

  const handleRemoveFile = (index) => {
    updateFormData({
      files: formData.files.filter((_, i) => i !== index),
    });
  };

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, 4));

  const prevStep = () =>
    setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Progress Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          <span>Step {currentStep} of 4</span>
          <span>{STEPS[currentStep - 1].title}</span>
        </div>

        {/* Step Indicator Bar */}
        <div className="grid grid-cols-4 gap-2">
          {STEPS.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;

            return (
              <div key={step.id} className="space-y-1.5">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isCompleted || isCurrent
                      ? "bg-[#8661F1]"
                      : "bg-zinc-200 dark:bg-zinc-800"
                  }`}
                />

                <p
                  className={`text-xs hidden sm:block font-medium truncate ${
                    isCurrent
                      ? "text-zinc-900 dark:text-zinc-100 font-semibold"
                      : "text-zinc-400 dark:text-zinc-500"
                  }`}
                >
                  {step.id}. {step.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wizard Card Body */}
      <Card
        variant="default"
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-xl p-6 md:p-8"
      >

        {/* STEP 1: Project Basics */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                Tell us about your project
              </h2>

              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Start with a clear title and describe the outcome you need.
              </p>
            </div>

            <div className="space-y-4">

              {/* Project Title */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Project title
                </label>

                <input
                  type="text"
                  placeholder="e.g. Senior React Developer for Fintech Dashboard"
                  value={formData.title}
                  onChange={(e) =>
                    updateFormData({ title: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#8661F1] dark:focus:ring-[#8661F1]"
                />

                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                  Keep it concise and specific.
                </p>
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Category
                </label>

                <select
                  value={formData.category}
                  onChange={(e) =>
                    updateFormData({ category: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#8661F1]"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Project Description */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Project description
                </label>

                <textarea
                  rows={5}
                  placeholder="Describe your project goals, scope, and key features..."
                  value={formData.description}
                  onChange={(e) =>
                    updateFormData({
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#8661F1]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Budget & Scope */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                Set your budget and scope
              </h2>

              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Choose a payment structure that fits the work.
              </p>
            </div>

            <div className="space-y-6">

              {/* Budget Type Cards */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
                  Budget type
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      updateFormData({ budgetType: "fixed" })
                    }
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.budgetType === "fixed"
                        ? "border-[#8661F1] bg-purple-50/50 dark:bg-purple-950/20 ring-2 ring-[#8661F1]"
                        : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    <div className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                      Fixed price
                    </div>

                    <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      Pay for the complete project
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      updateFormData({ budgetType: "hourly" })
                    }
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.budgetType === "hourly"
                        ? "border-[#8661F1] bg-purple-50/50 dark:bg-purple-950/20 ring-2 ring-[#8661F1]"
                        : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    <div className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                      Hourly rate
                    </div>

                    <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      Pay based on time worked
                    </div>
                  </button>
                </div>
              </div>

              {/* Min & Max Budget Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Minimum budget ($)
                  </label>

                  <input
                    type="number"
                    placeholder="e.g. 4000"
                    value={formData.minBudget}
                    onChange={(e) =>
                      updateFormData({ minBudget: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#8661F1]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Maximum budget ($)
                  </label>

                  <input
                    type="number"
                    placeholder="e.g. 6000"
                    value={formData.maxBudget}
                    onChange={(e) =>
                      updateFormData({ maxBudget: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#8661F1]"
                  />
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Experience level
                </label>

                <select
                  value={formData.experienceLevel}
                  onChange={(e) =>
                    updateFormData({
                      experienceLevel: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#8661F1]"
                >
                  {EXPERIENCE_LEVELS.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Skills & Timing */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                Skills & timing
              </h2>

              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Specify required technical skills, deadline, and reference files.
              </p>
            </div>

            <div className="space-y-6">

              {/* Required Skills */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Required skills
                </label>

                <div className="p-2 border border-zinc-300 dark:border-zinc-700 rounded-lg flex flex-wrap gap-2 items-center bg-transparent focus-within:ring-2 focus-within:ring-[#8661F1]">
                  {formData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
                    >
                      {skill}

                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                      >
                        <Xmark width={12} height={12} />
                      </button>
                    </span>
                  ))}

                  <input
                    type="text"
                    placeholder="Type skill and press Enter..."
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleAddSkill}
                    className="flex-1 min-w-[140px] bg-transparent text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none px-1 py-0.5"
                  />
                </div>
              </div>

              {/* Expected Duration & Deadline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Expected duration
                  </label>

                  <select
                    value={formData.duration}
                    onChange={(e) =>
                      updateFormData({ duration: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#8661F1]"
                  >
                    {DURATION_OPTIONS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Application deadline
                  </label>

                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) =>
                      updateFormData({ deadline: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#8661F1]"
                  />
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Attachments
                </label>

                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl cursor-pointer hover:border-[#8661F1] dark:hover:border-[#8661F1] transition-colors bg-zinc-50/50 dark:bg-zinc-950/30">
                  <ArrowUpFromLine
                    width={28}
                    height={28}
                    className="text-zinc-400 mb-2"
                  />

                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Drop project files here, or{" "}
                    <span className="text-[#8661F1]">browse</span>
                  </p>

                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                    Up to 5 files, 25 MB each
                  </p>

                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {/* Uploaded File List */}
                {formData.files.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {formData.files.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs"
                      >
                        <span className="font-medium text-zinc-700 dark:text-zinc-300 truncate">
                          {file.name}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleRemoveFile(idx)}
                          className="text-zinc-400 hover:text-rose-500 ml-2"
                        >
                          <Xmark width={14} height={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Review & Publish */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 mb-2">
                <Check width={12} height={12} className="mr-1" />
                Ready to publish
              </span>

              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                Review your project
              </h2>

              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Confirm the details before publishing to the marketplace.
              </p>
            </div>

            <div className="space-y-6 divide-y divide-zinc-200 dark:divide-zinc-800">

              {/* Basics Overview */}
              <div className="space-y-3 pt-2">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {formData.title || "Untitled Project"}
                </h3>

                <p className="text-sm text-zinc-600 dark:text-zinc-300 whitespace-pre-line leading-relaxed">
                  {formData.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {formData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-purple-50 text-[#8661F1] dark:bg-purple-950/40 dark:text-purple-300 border border-purple-100 dark:border-purple-800/40"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Scope & Budget Overview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                <div>
                  <p className="text-xs text-zinc-400 uppercase font-medium">
                    Budget
                  </p>

                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-1">
                    ${formData.minBudget || 0} – ${formData.maxBudget || 0}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-zinc-400 uppercase font-medium">
                    Experience
                  </p>

                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-1">
                    {formData.experienceLevel}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-zinc-400 uppercase font-medium">
                    Duration
                  </p>

                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-1">
                    {formData.duration}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-zinc-400 uppercase font-medium">
                    Deadline
                  </p>

                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-1">
                    {formData.deadline}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Footer */}
        <div className="flex items-center justify-between pt-8 mt-8 border-t border-zinc-200 dark:border-zinc-800">

          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <ChevronLeft width={14} height={14} />
                Back
              </button>
            )}
          </div>

          <div>
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-medium rounded-lg bg-[#8661F1] hover:bg-[#754ee4] text-white transition-colors shadow-sm"
              >
                Continue
                <ChevronRight width={14} height={14} />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onPublish && onPublish(formData)}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-semibold rounded-lg bg-[#8661F1] hover:bg-[#754ee4] text-white transition-colors shadow-md"
              >
                Publish project
              </button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
