"use client";

import { type ButtonHTMLAttributes, memo } from "react";
import { useFormStatus } from "react-dom";
import LoaderSvg from "../svg/Loader";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export interface SubmitBtnProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

function SubmitBtn({ children, className, disabled, ...rest }: SubmitBtnProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      {...rest}
      disabled={pending || disabled}
      aria-disabled={pending}
      className={cn(
        "rounded-md",
        pending && "cursor-wait",
        disabled && "cursor-not-allowed opacity-40",
        className,
        "flex justify-center items-center"
      )}
    >
      {pending ? (
        <div className="flex justify-center items-center">
          <LoaderSvg />
        </div>
      ) : (
        children
      )}
    </Button>
  );
}

export default memo(SubmitBtn);
