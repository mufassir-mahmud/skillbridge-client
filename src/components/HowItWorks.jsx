
import {
  FolderPlus,
  FileCheck2,
  MessagesSquare,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Post your project",
    description:
      "Share your goals, requirements, and budget in minutes.",
    icon: FolderPlus,
  },
  {
    number: "02",
    title: "Compare qualified bids",
    description:
      "Review tailored proposals side by side and choose the right freelancer.",
    icon: FileCheck2,
  },
  {
    number: "03",
    title: "Collaborate in one place",
    description:
      "Manage conversations, milestones, and deliverables without the hassle.",
    icon: MessagesSquare,
  },
  {
    number: "04",
    title: "Approve & release payment",
    description:
      "Release secure payments when the work is completed and you're satisfied.",
    icon: ShieldCheck,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#F1F3F8] px-5 py-20 transition-colors duration-300 dark:bg-[#0d0b17] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-[#8661f1]/20 bg-[#8661f1]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7653e5] dark:text-[#b9a5ff]">
            Built for momentum
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            From idea to impact,{" "}
            <span className="text-[#8661f1]">
              faster.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-400">
            One clear workflow keeps projects, proposals,
            milestones, and payments moving.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#8661f1]/40 hover:shadow-xl hover:shadow-[#8661f1]/10 dark:border-white/10 dark:bg-[#171322]"
              >
                {/* Top Row */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold tracking-widest text-[#8661f1]">
                    {step.number}
                  </span>

                  <ArrowUpRight
                    size={19}
                    className="text-gray-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#8661f1]"
                  />
                </div>

                {/* Icon */}
                <div className="mt-9 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#8661f1]/10 text-[#8661f1] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#8661f1] group-hover:text-white">
                  <Icon size={29} strokeWidth={1.8} />
                </div>

                {/* Content */}
                <h3 className="mt-7 text-xl font-semibold leading-snug text-gray-900 dark:text-white">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>

                {/* Bottom Accent */}
                <div className="mt-7 h-1 w-10 rounded-full bg-[#8661f1]/30 transition-all duration-300 group-hover:w-20 group-hover:bg-[#8661f1]" />

                {/* Decorative Background */}
                <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-[#8661f1]/5 transition-transform duration-500 group-hover:scale-150" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
