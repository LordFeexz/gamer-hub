"use client";

import EmailForm from "@/components/common/EmailForm";
import SubmitBtn from "@/components/common/SubmitBtn";
import useServerAction from "@/hooks/useServerAction";
import type { CustomSession } from "@/interfaces";
import Form from "next/form";
import { memo } from "react";
import { forget_password_action } from "../action";
import DisplayError from "@/components/common/DisplayError";
import ErrorMessage from "@/components/common/ErrorMessage";
import useInIndonesia from "@/hooks/useInIndonesia";
import useUpdateQueries from "@/hooks/useUpdateQueries";

export interface ForgetPasswordFormProps {
  session: CustomSession | null;
}

function ForgetPasswordForm({ session }: ForgetPasswordFormProps) {
  const [{ code, message, error }, form_action] = useServerAction(
    forget_password_action
  );

  const onChangeHandler = useUpdateQueries(300);

  const isIn = useInIndonesia();

  return (
    <Form id="forget-password-form" action={form_action}>
      <div className="grid gap-y-4">
        <input
          type="hidden"
          name="lang"
          className="hidden"
          value={isIn ? "id" : "en"}
        />
        <input
          type="hidden"
          name="token"
          className="hidden"
          defaultValue={session?.user?.access_token ?? undefined}
        />
        {!session && (
          <EmailForm
            onChange={onChangeHandler}
            className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
            required
            name="email"
            id="email"
            label="Email address"
            labelClass="text-sm font-bold ml-1 mb-2 dark:text-white"
          />
        )}
        {code === 400 && error?.email && (
          <DisplayError
            className="flex justify-center"
            messages={error.email}
          />
        )}
        {code === 404 && (
          <ErrorMessage className="flex justify-center" message={message} />
        )}
        <SubmitBtn
          type="submit"
          className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
        >
          Send email verification
        </SubmitBtn>
      </div>
    </Form>
  );
}

export default memo(ForgetPasswordForm);
