import { memo } from "react";

export interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <span className="text-red-500 text-xs font-bold antialiased">
      {message}
    </span>
  );
}

export default memo(ErrorMessage);
