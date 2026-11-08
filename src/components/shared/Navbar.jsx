
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import {
  Menu,
  X,
  BriefcaseBusiness,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { authClient, signOut } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Find Project", href: "/projects" },
  { name: "Companies", href: "/companies" },
  { name: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();
const router = useRouter();

const handleSignOut = async () => {
  try {
    await authClient.signOut();

    router.replace("/auth/signin");
    router.refresh();
  } catch (error) {
    console.error("Sign out failed:", error);
  }
};
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
const { data: session, isPending } = authClient.useSession();
 console.log(session);
 const user = session?.user ;
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-default-200 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-2.5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8661f1] text-white shadow-md shadow-[#8661f1]/30">
            <BriefcaseBusiness size={22} />
          </div>

          <span className="text-2xl font-extrabold tracking-tight">
            Skill<span className="text-[#8661f1]">Bridge</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-default-600 transition-colors hover:text-[#8661f1]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">

          {/* Theme Toggle */}
          {mounted && (
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-default-200 text-default-600 transition-colors hover:bg-default-100"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun size={20} className="text-amber-400" />
              ) : (
                <Moon size={20} />
              )}
            </button>
          )}

          <div className="h-6 w-px bg-default-200" />

          {/* Sign In */}
          
          {user ?<> <Link
            href="/auth/signin" onClick={() => handleSignOut()}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-default-700 transition-colors hover:text-[#8661f1]"  
           >
            Sign Out
          </Link> </>:
          <Link
            href="/auth/signin"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-default-700 transition-colors hover:text-[#8661f1]"
          >
            Sign In
          </Link>
          
        }
          {user && (
  <Image
    src={user.image}
    alt="User profile"
    width={32}
    height={32}
    className="rounded-full object-cover"
  />
)}

          {/* Get Started */}
          <Button
            as={Link}
            href="/auth/signup"
            color="primary"
            radius="lg"
            className="bg-[#8661f1] px-6 font-semibold text-white shadow-md shadow-[#8661f1]/25 hover:bg-[#744ee6]"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">

          {mounted && (
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-default-700 transition-colors hover:bg-default-100"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun size={20} className="text-amber-400" />
              ) : (
                <Moon size={20} />
              )}
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="rounded-lg p-2 text-default-700 transition-colors hover:bg-default-100"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-default-200 bg-background px-5 py-5 shadow-lg md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium text-default-700 transition-colors hover:bg-default-100 hover:text-[#8661f1]"
              >
                {link.name}
              </Link>
            ))}

            <div className="my-2 border-t border-default-200" />

            <Link
              href="/auth/signin"
              onClick={closeMenu}
              className="rounded-lg border border-default-300 px-4 py-3 text-center text-sm font-semibold text-default-700 transition-colors hover:bg-default-100"
            >
              Sign In
            </Link>

            <Button
              as={Link}
              href="/auth/signup"
              color="primary"
              fullWidth
              radius="lg"
              onClick={closeMenu}
              className="bg-[#8661f1] font-semibold text-white hover:bg-[#744ee6]"
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
