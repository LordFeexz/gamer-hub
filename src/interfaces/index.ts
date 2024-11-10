import type { Session } from "next-auth";

export type Lang = "en" | "id";

export interface CustomSession extends Session {
  user?: {
    id?: string;
    name?: string | null;
    access_token?: string | null;
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
  searchParams: Promise<Partial<searchParams> & { lang: Lang }>;
};

export interface BasePagination {
  page?: number | string;
  limit?: number | string;
}
