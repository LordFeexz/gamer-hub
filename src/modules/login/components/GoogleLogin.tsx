"use client";

import useMount from "@/hooks/useMounted";
import { memo, useCallback, useState } from "react";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import GoogleOauth from "@/components/providers/GoogleOauth";
import { google_login_action } from "../action";
import { useRouter } from "next/navigation";
import ErrorMessage from "@/components/common/ErrorMessage";
import { signIn } from "next-auth/react";

function GoogleLoginBtn() {
  const router = useRouter();
  const mount = useMount();
  const [error, setError] = useState<string | null>(null);

  const googleSubmit = useCallback(
    async ({ credential }: CredentialResponse) => {
      if (!credential) return;
      const { code, data, message } = await google_login_action(credential);
      if (code !== 200) {
        setError(message);
        return;
      }

      await signIn("credentials", { access_token: data, redirect: false });
      router.replace("/");
    },
    [router, mount]
  );

  if (!mount) return null;

  return (
    <GoogleOauth>
      <div className="flex flex-wrap flex-col space-y-2 justify-center items-center">
        <GoogleLogin
          onSuccess={googleSubmit}
          useOneTap
          cancel_on_tap_outside
          text="signin_with"
          shape="circle"
          size="medium"
          context="signin"
          type="icon"
        />
        {!!error && <ErrorMessage message={error} />}
      </div>
    </GoogleOauth>
  );
}

export default memo(GoogleLoginBtn);
