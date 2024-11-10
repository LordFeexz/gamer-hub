"use client";

import Form from "next/form";
import { Label } from "@/components/ui/label";
import AnimatedInput from "@/components/ui/AnimatedInput";
import PasswordInput from "@/components/common/PasswordInput";
import SubmitBtn from "@/components/common/SubmitBtn";
import Link from "next/link";
import { login_action } from "../action";
import { memo, useEffect } from "react";
import useServerAction from "@/hooks/useServerAction";
import DisplayError from "@/components/common/DisplayError";
import ErrorMessage from "@/components/common/ErrorMessage";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import GoogleLogin from "./GoogleLogin";
import useUpdateQueries from "@/hooks/useUpdateQueries";

export interface LoginFormProps {
  defaultValue?: {
    identifier?: string;
    password?: string;
  };
}

function LoginForm({ defaultValue }: LoginFormProps) {
  const [{ message, data, error, code }, form_action] =
    useServerAction(login_action);
  const router = useRouter();
  const onChangeHandler = useUpdateQueries(300);

  useEffect(() => {
    if (!data) return;

    (async () => {
      await signIn("credentials", { access_token: data, redirect: false });
      router.replace("/home");
    })();
  }, [data, router]);

  return (
    <Form
      className="space-y-4 md:space-y-6"
      id="login-form"
      action={form_action}
    >
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label
          htmlFor="identifier"
          className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-300 after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          Username / Email
        </Label>
        <div className="mt-1 relative rounded-md shadow-sm">
          {code === 400 && !!error?.identifier?.length && (
            <DisplayError messages={error?.identifier} />
          )}
          <AnimatedInput
            onChange={onChangeHandler}
            id="identifier"
            name="identifier"
            placeholder="JohnDoe / JohnDoe@gmail.com"
            type="text"
            required
            defaultValue={defaultValue?.identifier || ""}
            pattern="^\S{3,}$"
            title="identifier must be at least 3 characters long and must not contain spaces."
            className="appearance-none bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:blue-600 focus:border-teal-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <PasswordInput
        onChange={onChangeHandler}
        defaultValue={defaultValue?.password || ""}
        id="password"
        name="password"
        className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:blue-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
        label="Password"
        labelClass="mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-300"
      />
      {code === 401 && (
        <div className="flex justify-center">
          <ErrorMessage message={message} />
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-start"></div>
        <Link
          prefetch
          href="/auth/forget-password"
          className="text-sm font-medium text-blue-500 hover:underline"
        >
          Forgot password?
        </Link>
      </div>
      <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
        <p className="mx-4 mb-0 text-center text-sm dark:text-neutral-200">
          OR
        </p>
      </div>
      <div className="container mt-2 cursor-pointer align-middle mx-auto flex justify-center items-center gap-3">
        <GoogleLogin />
      </div>
      <SubmitBtn
        type="submit"
        className="w-full flex justify-center items-center shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
      >
        sign in
      </SubmitBtn>
      <p className="text-sm text-center text-gray-500 dark:text-gray-400">
        Not register yet?{" "}
        <Link
          prefetch
          href="/auth/register"
          className="font-medium text-blue-500 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </Form>
  );
}

export default memo(LoginForm);
