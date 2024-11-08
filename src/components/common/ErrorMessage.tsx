import { cn } from "@/lib/utils";
import { memo } from "react";

export interface ErrorMessageProps {
  message: string;
  className?: string;
}

function ErrorMessage({ message, className }: ErrorMessageProps) {
  return (
    <span
      className={cn("text-red-500 text-xs font-bold antialiased", className)}
    >
      {message}
    </span>
  );
}

export default memo(ErrorMessage);
