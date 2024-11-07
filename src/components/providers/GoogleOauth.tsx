"use client";

import type { ChildrenProps } from "@/interfaces";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { memo } from "react";

function GoogleOauth({ children }: ChildrenProps) {
  const clientId = process.env.GOOGLE_OAUTH_CLIENTID;

  return (
    <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
  );
}

export default memo(GoogleOauth);
