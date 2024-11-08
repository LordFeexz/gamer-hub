import type { PageProps } from "@/interfaces";
import { sanitize_search_params } from "@/lib/utils";

export default async function Page({
  searchParams,
}: PageProps<null, { token?: string }>) {
  const { token = "" } = await sanitize_search_params(searchParams);
}
