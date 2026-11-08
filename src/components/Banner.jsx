
"use client";

import Image from "next/image";
import Link from "next/link";
import { MoveRight, Star } from "lucide-react";

const Banner = () => {
  const imageUrl =
    "https://images.unsplash.com/photo-1714976327304-2a9637fbce98?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200";

  return (
    <section className="relative w-full bg-background py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10">

        {/* Left Side */}
        <div className="flex flex-col gap-8 lg:gap-10">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold tracking-wide text-[#8661f1] uppercase">
              The smarter way to work
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-default-900 md:text-5xl lg:text-6xl">
              Find the right talent.
              <br />
              <span className="text-default-500">
                Build something great.
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-lg text-default-600 sm:text-xl">
              Connect with exceptional independent professionals, compare
              qualified bids, and bring ambitious ideas to life—all in one
              trusted workspace.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Link
              href="/projects"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#8661f1] px-8 text-base font-semibold text-white shadow-lg shadow-[#8661f1]/30 transition-all hover:bg-[#744ee6]"
            >
              Find projects
            </Link>

            <Link
              href="/hire"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-default-300 bg-background px-8 text-base font-medium text-default-700 transition-colors hover:bg-default-100"
            >
              Hire freelancers
              <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Trusted Footer */}
          <div className="mt-6 flex flex-col gap-4 border-t border-default-200 pt-8 sm:flex-row sm:items-center sm:gap-6">
            <p className="text-sm font-medium text-default-600">
              Trusted by 12,000+ teams
            </p>

            <div className="flex items-center gap-1.5 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}

              <span className="ml-1 text-sm font-semibold text-default-700">
                4.9 average rating
              </span>
            </div>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl sm:aspect-[5/4] lg:aspect-square">
  <Image
    src={imageUrl}
    alt="Collaborative workspace"
    fill
    className="object-cover object-center transition-transform duration-500 hover:scale-105"
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
    priority
  />

  {/* Proposal Card */}
  <div className="absolute left-3 top-4 flex w-[180px] flex-col gap-2 rounded-xl bg-white/90 p-3 shadow-xl backdrop-blur-md sm:left-5 sm:top-8 sm:w-60 sm:gap-3 sm:rounded-2xl sm:p-5 lg:left-6 lg:top-10 lg:w-64 dark:bg-gray-900/80">
    <div className="flex items-center justify-between gap-2">
      <span className="text-[10px] font-semibold text-[#8661f1] sm:text-xs">
        SkillBridge
      </span>
      <span className="text-[10px] text-default-500 sm:text-xs">
        Just now
      </span>
    </div>

    <p className="text-xs font-bold text-default-900 sm:text-sm">
      New proposal received
    </p>

    <p className="text-xs text-default-700 sm:text-sm">
      <span className="font-semibold text-default-900">$5,200</span>
      {" "}· 42 days
    </p>
  </div>

  {/* Freelancer Card */}
  <div className="absolute bottom-4 right-3 flex items-center gap-2 rounded-full bg-white/90 p-2 pr-3 shadow-xl backdrop-blur-md sm:bottom-8 sm:right-5 sm:gap-3 sm:p-3 sm:pr-5 lg:bottom-10 lg:right-6 lg:gap-4 lg:pr-6 dark:bg-gray-900/80">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-white bg-default-200 text-xs font-bold text-default-600 shadow-md sm:h-12 sm:w-12 sm:text-sm">
      MC
    </div>

    <div className="min-w-0">
      <p className="text-xs font-bold text-default-900 sm:text-sm">
        Maya Chen
      </p>

      <p className="flex items-center gap-1 text-[10px] text-default-600 sm:gap-1.5 sm:text-xs">
        <span className="truncate">Product Engineer</span>
        <Star
          size={12}
          fill="#f59e0b"
          className="shrink-0 text-amber-500 sm:h-3.5 sm:w-3.5"
        />
        <span className="font-semibold text-default-700">4.9</span>
      </p>
    </div>
  </div>
</div>
      </div>
    </section>
  );
};

export default Banner;
