import { memo } from "react";

export interface PasswordEyeProps {
  w?: string | number;
  h?: string | number;
  open: boolean;
}

function PasswordEye({ w = 24, h = 24, open }: PasswordEyeProps) {
  return (
    <svg
      className="shrink-0 size-3.5"
      width={w}
      height={h}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        className={open ? "hidden" : ""}
        d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
      ></path>
      <path
        className={open ? "hidden" : ""}
        d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
      ></path>
      <path
        className={open ? "hidden" : ""}
        d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
      ></path>
      <line
        className={open ? "hidden" : ""}
        x1="2"
        x2="22"
        y1="2"
        y2="22"
      ></line>
      <path
        className={open ? "" : "hidden"}
        d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
      ></path>
      <circle className={open ? "" : "hidden"} cx="12" cy="12" r="3"></circle>
    </svg>
  );
}

export default memo(PasswordEye);