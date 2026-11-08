
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  BriefcaseBusiness,
  Users,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";

const SearchSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const popularSearches = [
    "Web Development",
    "UI/UX Design",
    "AI & Data",
    "Marketing",
  ];

  const stats = [
    {
      value: "18K+",
      label: "Active projects",
      icon: BriefcaseBusiness,
    },
    {
      value: "42K+",
      label: "Skilled freelancers",
      icon: Users,
    },
    {
      value: "96K+",
      label: "Projects completed",
      icon: CheckCircle,
    },
    {
      value: "$48M+",
      label: "Payments protected",
      icon: ShieldCheck,
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    router.push(
      `/projects?search=${encodeURIComponent(searchTerm.trim())}`
    );
  };

  return (
    <section className="bg-background px-5 py-14 transition-colors duration-300 sm:px-8 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-5xl">

        {/* Heading */}
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#8661f1]">
            Explore Opportunities
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-default-900 sm:text-4xl lg:text-5xl">
            Find your next great project.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-default-500 sm:text-base">
            Discover exciting opportunities, connect with clients, and turn
            your skills into meaningful work.
          </p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-3 rounded-2xl border border-default-200 bg-content1 p-2 shadow-lg shadow-black/5 transition-colors sm:flex-row sm:items-center"
        >
          <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
            <Search
              size={21}
              className="shrink-0 text-default-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search projects by title, skill, or keyword"
              className="h-12 w-full min-w-0 bg-transparent text-sm text-default-900 outline-none placeholder:text-default-400 sm:text-base"
            />
          </div>

          <button
            type="submit"
            className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#8661f1] px-7 text-sm font-semibold text-white transition-all hover:bg-[#744ee6] active:scale-[0.98]"
          >
            <Search size={17} />
            Search projects
          </button>
        </form>

        {/* Popular Searches */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-sm">
          <span className="font-medium text-default-500">
            Popular:
          </span>

          {popularSearches.map((item) => (
            <Link
              key={item}
              href={`/projects?search=${encodeURIComponent(item)}`}
              className="rounded-full border border-default-200 bg-default-100 px-3 py-1.5 text-xs font-medium text-default-600 transition-all hover:border-[#8661f1] hover:bg-[#8661f1]/10 hover:text-[#8661f1] sm:text-sm"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="my-12 border-t border-default-200" />

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="group rounded-2xl border border-default-200 bg-content1 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#8661f1]/40 hover:shadow-lg hover:shadow-black/5 sm:p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#8661f1]/10 text-[#8661f1] transition-colors group-hover:bg-[#8661f1] group-hover:text-white">
                  <Icon size={20} />
                </div>

                <h3 className="text-2xl font-semibold tracking-tight text-default-900 sm:text-3xl">
                  {stat.value}
                </h3>

                <p className="mt-1 text-xs font-medium text-default-500 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
