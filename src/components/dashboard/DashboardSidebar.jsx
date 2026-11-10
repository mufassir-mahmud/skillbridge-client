"use client";

import {
  Briefcase,
  House,
  Folder,
  Plus,
  FileText,
  MessageSquare,
  CreditCard,
  Star,
  Settings,
  Sun,
  Moon,
  Globe,
  Menu,
  X,
  BriefcaseBusiness,
} from "lucide-react";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine current role dynamically from URL first (for instant SSR matching), fallback to user role
  const isFreelancer = pathname?.startsWith("/dashboard/freelancer");
  const role = isFreelancer
    ? "freelancer"
    : pathname?.startsWith("/dashboard/client")
    ? "client"
    : user?.role?.toLowerCase() || "client";

  // Build role-based dynamic navigation links
  const navItems = [
    { icon: House, href: `/dashboard/${role}`, label: "Overview" },
    { icon: Folder, href: `/dashboard/${role}/projects`, label: "My projects" },
    ...(role === "client"
      ? [{ icon: Plus, href: `/dashboard/client/projects/new`, label: "Post a project" }]
      : []),
    { icon: FileText, href: `/dashboard/${role}/proposals`, label: "Proposals" },
    { icon: Briefcase, href: `/dashboard/${role}/contracts`, label: "Active contracts" },
    { icon: MessageSquare, href: `/dashboard/${role}/messages`, label: "Messages", badge: 3 },
    { icon: CreditCard, href: `/dashboard/${role}/payments`, label: "Payments" },
    { icon: Star, href: `/dashboard/${role}/reviews`, label: "Reviews" },
    { icon: Settings, href: `/dashboard/${role}/settings`, label: "Settings" },
  ];

  const isDark = mounted && theme === "dark";

  const navContent = (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <Link href={`/dashboard/${role}`} className="mb-9 flex items-center gap-2 px-3 pt-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8661f1] text-white shadow-md shadow-[#8661f1]/30">
          <BriefcaseBusiness size={22} />
        </div>
        <span className="text-2xl font-extrabold tracking-tight">
          Skill<span className="text-[#8661f1]">Bridge</span>
        </span>
      </Link>

      {/* Navigation Header */}
      <div className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-default-400 capitalize">
        {role} Workspace
      </div>

      {/* Navigation List */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#8661f1] text-white font-semibold"
                  : "text-default-500 hover:bg-default-100 hover:text-foreground"
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon size={19} />
                {item.label}
              </span>

              {item.badge && (
                <span
                  className={`flex size-5 items-center justify-center rounded-full text-xs font-semibold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-[#8661f1] text-white"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        {/* Theme Toggle */}
        <button
          type="button"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-default-500 transition-colors hover:bg-default-100 hover:text-foreground"
        >
          {isDark ? <Sun size={19} /> : <Moon size={19} />}
          {isDark ? "Light mode" : "Dark mode"}
        </button>

        {/* Back to website */}
        <Link
          href="/"
          className="mb-4 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-default-500 transition-colors hover:bg-default-100 hover:text-foreground"
        >
          <Globe size={19} />
          Back to website
        </Link>

        {/* User Info Footer */}
        <div className="border-t border-default-200 pt-4">
          <div className="flex items-center gap-3 px-2">
            {!mounted ? (
              // Hydration Skeleton for User Profile
              <div className="flex items-center gap-3 w-full animate-pulse">
                <div className="size-10 rounded-full bg-default-200" />
                <div className="flex-1 space-y-1">
                  <div className="h-3.5 w-20 rounded bg-default-200" />
                  <div className="h-2.5 w-12 rounded bg-default-200" />
                </div>
              </div>
            ) : user?.image ? (
              <Image
                src={user.image}
                alt="User profile"
                width={36}
                height={36}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#8661f1]/15 font-semibold text-[#8661f1]">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}

            {mounted && (
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-default-400 capitalize">
                  {user?.role || role}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden h-screen w-64 shrink-0 border-r border-default-200 bg-background p-4 lg:sticky lg:top-0 lg:block">
        {navContent}
      </aside>

      {/* Mobile Sidebar Trigger & Drawer */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-default-200 px-3 py-2 text-sm font-medium"
        >
          <Menu size={20} />
          Menu
        </button>

        {open && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setOpen(false)}
            />

            <aside className="relative z-10 flex h-full w-72 flex-col bg-background p-4 shadow-xl">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mb-3 ml-auto rounded-lg p-2 hover:bg-default-100"
              >
                <X size={20} />
              </button>

              {navContent}
            </aside>
          </div>
        )}
      </div>
    </>
  );
}