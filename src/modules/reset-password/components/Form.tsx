"use client";

import useServerAction from "@/hooks/useServerAction";
import Form from "next/form";
import { memo, useRef } from "react";
import { reset_password_action } from "../action";
import SubmitBtn from "@/components/common/SubmitBtn";
import PasswordInput from "@/components/common/PasswordInput";
import ErrorMessage from "@/components/common/ErrorMessage";
import useWriteQueries from "@/hooks/useWriteQueries";

export interface ResetPasswordFormProps {
  token: string;
}

function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [{ code, error, message }, form_action] = useServerAction(
    reset_password_action
  );

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  useWriteQueries(0, passwordRef, confirmPasswordRef);

  return (
    <Form
      action={form_action}
      className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
      id="reset-password-form"
    >
      <input
        type="hidden"
        className="hidden"
        name="token"
        defaultValue={token}
      />
      <PasswordInput
        ref={passwordRef}
        errors={error?.password}
        id="password"
        name="password"
        label="Password"
        required
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
        placeHolder="..........."
        labelClass="mb-2 text-sm font-medium text-gray-900 dark:text-white"
      />
      <PasswordInput
        ref={confirmPasswordRef}
        errors={error?.confirmPassword}
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        required
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
        placeHolder="..........."
        labelClass="mb-2 text-sm font-medium text-gray-900 dark:text-white"
      />

      {[401, 404].includes(code) && (
        <ErrorMessage className="flex justify-center" message={message} />
      )}
      <SubmitBtn
        type="submit"
        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
      >
        Reset password
      </SubmitBtn>
    </Form>
  );
}

export default memo(ResetPasswordForm);
