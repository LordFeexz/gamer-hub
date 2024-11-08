import type { PageProps } from "@/interfaces";
import { sanitize_search_params } from "@/lib/utils";
import Register from "@/modules/register";

export default async function Page({
  searchParams,
}: PageProps<
  null,
  {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
>) {
  const {
    username = "",
    email = "",
    password = "",
    confirmPassword = "",
  } = await sanitize_search_params(searchParams);

  return (
    <Register
      username={username}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
    />
  );
}
