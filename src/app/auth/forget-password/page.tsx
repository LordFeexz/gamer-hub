import { getServerSideSession } from "@/helpers/global";
import ForgetPassword from "@/modules/forget-password";

export default async function Page() {
  const session = await getServerSideSession();

  return <ForgetPassword session={session} />;
}
