import { memo } from "react";
import ErrorMessage from "./ErrorMessage";

export interface DisplayErrorProps {
  messages: string[];
}

function DisplayError({ messages }: DisplayErrorProps) {
  return (
    <div className="space-y-2">
      {messages.map((message) => (
        <ErrorMessage key={message} message={message} />
      ))}
    </div>
  );
}

export default memo(DisplayError);
