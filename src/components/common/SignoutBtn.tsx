"use client";

import { memo, useCallback, type MouseEventHandler } from "react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import useMounted from "@/hooks/useMounted";
import type { OptionClassName } from "@/interfaces/component";

export interface SignoutBtnProps extends OptionClassName {}

function SignoutBtn({ className }: SignoutBtnProps) {
  const { data: session, status } = useSession();
  const mount = useMounted();

  const onClickHandler: MouseEventHandler = useCallback(
    async (e) => {
      if (session) await signOut();
    },
    [session]
  );

  if (status === "loading" || !session || !mount) return null;

  return (
    <Button variant="outline" onClick={onClickHandler}>
      <LogOut className="mr-2 h-4 w-4" /> Sign Out
    </Button>
  );
}

export default memo(SignoutBtn);
