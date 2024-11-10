import { get_server_side_session } from "@/helpers/global";
import ForgetPassword from "@/modules/forget-password";

export default async function Page() {
  const session = await get_server_side_session();

  return <ForgetPassword session={session} />;
}
