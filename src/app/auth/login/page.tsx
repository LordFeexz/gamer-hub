import type { PageProps } from "@/interfaces";
import { sanitize_search_params } from "@/lib/utils";
import LoginPage from "@/modules/login";

export default async function Page({
  searchParams,
}: PageProps<null, { identifier: string; password: string }>) {
  const { identifier = "", password = "" } = await sanitize_search_params(
    searchParams
  );

  return <LoginPage identifier={identifier} password={password} />;
}
