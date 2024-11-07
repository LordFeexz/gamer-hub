import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import sanitize from "sanitize-html";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitize_search_params(params: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => [key, sanitize(value)])
  );
}
