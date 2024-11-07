"use client";

import type { ChildrenProps } from "@/interfaces";
import { SessionProvider } from "next-auth/react";
import { memo } from "react";

function AppSessionProvider({ children }: ChildrenProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default memo(AppSessionProvider);
