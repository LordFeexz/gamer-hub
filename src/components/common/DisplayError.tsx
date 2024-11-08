import { memo } from "react";
import ErrorMessage from "./ErrorMessage";
import { cn } from "@/lib/utils";

export interface DisplayErrorProps {
  messages: string[];
  className?: string;
}

function DisplayError({ messages, className }: DisplayErrorProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {messages.map((message) => (
        <ErrorMessage key={message} message={message} />
      ))}
    </div>
  );
}

export default memo(DisplayError);
