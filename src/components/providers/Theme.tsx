"use client";

import type { ChildrenProps } from "@/interfaces";
import { ThemeProvider } from "next-themes";
import { memo } from "react";

function AppThemeProvider({ children }: ChildrenProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {children}
    </ThemeProvider>
  );
}

export default memo(AppThemeProvider);
