import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import sanitize from "sanitize-html";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function sanitize_search_params<T extends object = {}>(
  params: Promise<T>
) {
  return Object.fromEntries(
    Object.entries((await params) || {}).map(([key, value]) => [
      key,
      sanitize(value),
    ])
  );
}
