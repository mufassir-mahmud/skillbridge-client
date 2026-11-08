
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#6845d9] via-[#8661f1] to-[#a78bfa] px-5 py-10 transition-colors duration-300 dark:from-[#24164a] dark:via-[#38236b] dark:to-[#4c3485] sm:px-8 lg:px-10">

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 md:grid-cols-2">

        {/* Left Side */}
        <div className="max-w-xl text-white">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-medium tracking-wider">
            <Sparkles size={14} />
            START BUILDING TODAY
          </div>

          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
            Your next great project starts here.
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-6 text-white/80 sm:text-base">
            Join thousands of businesses and independent professionals
            doing their best work together.
          </p>

        </div>

        {/* Right Side */}
        <div className="flex justify-start md:justify-end">

          <div className="w-full max-w-sm rounded-2xl border border-white/30 bg-white/15 p-6 shadow-lg backdrop-blur-md transition-colors duration-300 dark:border-white/10 dark:bg-[#171322]/70">

            <h3 className="text-xl font-semibold text-white">
              Create your free account
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/80">
              Start connecting with talented professionals and bring
              your ideas to life.
            </p>

            <Link
              href="/auth/signup"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#7653e5] shadow-md transition-all hover:-translate-y-0.5 hover:bg-gray-100 dark:bg-[#8661f1] dark:text-white dark:hover:bg-[#744ee6]"
            >
              Get Started
              <ArrowRight size={17} />
            </Link>

            <p className="mt-4 text-center text-xs text-white/80">
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="font-semibold text-white underline underline-offset-4 hover:text-white/70"
              >
                Sign In
              </Link>
            </p>

          </div>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="mx-auto mt-9 max-w-7xl border-t border-white/20 pt-5 text-center text-xs text-white/70">
        © 2026 SkillBridge. All rights reserved.
      </div>

    </footer>
  );
}
