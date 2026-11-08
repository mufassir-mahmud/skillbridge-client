"use client";

import { useCallback } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";

export function Providers({ children }) {
  const router = useRouter();

  const navigate = useCallback(
    (href) => {
      router.push(href);
    },
    [router]
  );

  return (
    <HeroUIProvider navigate={navigate}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
      >
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  );
}