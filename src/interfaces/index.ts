import type { Session } from "next-auth";
import type { ReactNode } from "react";
import type { z, ZodError, ZodType } from "zod";

export interface ChildrenProps {
  readonly children: ReactNode;
}

export interface CustomSession extends Session {
  user?: {
    id?: string;
    name?: string | null;
    access_token?: string | null;
    isVerified: boolean;
  };
}

export interface DefaultResponse<T = any> {
  message: string;
  error: Record<string, string[]> | null;
  data?: T | null;
  code: number;
}

export type ServerAction<T = any> = (
  prev: DefaultResponse<T>,
  formData: FormData
) => Promise<DefaultResponse<T>>;

export type PageProps<
  params = Record<string, string>,
  searchParams = Record<string, string>
> = {
  params: Promise<params>;
  searchParams: Promise<Partial<searchParams>>;
};

export interface BasePagination {
  page?: number;
  limit?: number;
}
