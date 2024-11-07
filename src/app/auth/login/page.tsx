import { sanitize_search_params } from "@/lib/utils";
import LoginPage from "@/modules/login";

export default async function Page({ searchParams }: any) {
  const { identifier, password } = sanitize_search_params(await searchParams);

  return <LoginPage identifier={identifier} password={password} />;
}
