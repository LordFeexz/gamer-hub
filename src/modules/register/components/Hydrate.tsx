"use client";

import useUnauthenticatedOnly from "@/hooks/useUnauthenticatedOnly";
import { memo } from "react";

function Hydrate() {
  useUnauthenticatedOnly();
  return null;
}

export default memo(Hydrate);
