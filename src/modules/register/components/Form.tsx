"use client";

import EmailForm from "@/components/common/EmailForm";
import PasswordInput from "@/components/common/PasswordInput";
import AnimatedInput from "@/components/ui/AnimatedInput";
import { Label } from "@/components/ui/label";
import useServerAction from "@/hooks/useServerAction";
import Form from "next/form";
import { memo, useEffect } from "react";
import { register_action } from "../action";
import SubmitBtn from "@/components/common/SubmitBtn";
import DisplayError from "@/components/common/DisplayError";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useRouter } from "next/navigation";
import { USER_CREATED_RESPONSE } from "../constant";
import useUpdateQueries from "@/hooks/useUpdateQueries";

export interface RegisterFormProps {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function RegisterForm({
  username,
  email,
  password,
  confirmPassword,
}: RegisterFormProps) {
  const [{ code, message, error }, form_action] =
    useServerAction(register_action);
  const router = useRouter();

  const onChangeHandler = useUpdateQueries();

  useEffect(() => {
    if (code === 200 && message === USER_CREATED_RESPONSE)
      router.push("/auth/login");
  }, [code, message]);

  return (
    <Form action={form_action} id="register-form">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label
          htmlFor="username"
          className="block text-sm font-medium leading-5 text-neutral-900 dark:text-neutral-300 after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          Username
        </Label>
        <div className="mt-1 relative rounded-md shadow-sm">
          {code === 400 && !!error?.username && (
            <DisplayError messages={error.username} />
          )}
          <AnimatedInput
            onChange={onChangeHandler}
            id="username"
            name="username"
            placeholder="John Doe"
            type="text"
            required
            defaultValue={username}
            pattern="^\S{3,}$"
            title="Username must be at least 3 characters long and must not contain spaces."
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          />
        </div>
      </div>

      <EmailForm
        errors={error?.email}
        defaultValue={email}
        onChange={onChangeHandler}
        id="email"
        name="email"
        required
        label="Email Address"
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        labelClass="text-sm font-medium leading-5 text-gray-700"
      />

      <PasswordInput
        errors={error?.password}
        defaultValue={password}
        onChange={onChangeHandler}
        id="password"
        name="password"
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
        title="Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
        className="appearance-none mt-1 shadow-sm block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        label="Password"
        required
        labelClass="text-sm font-medium leading-5 text-gray-700"
      />

      <PasswordInput
        errors={error?.confirmPassword}
        defaultValue={confirmPassword}
        onChange={onChangeHandler}
        required
        id="confirmPassword"
        name="confirmPassword"
        title="Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        label="Confirm Password"
        labelClass="text-sm font-medium leading-5 text-gray-700"
      />
      {code === 409 && (
        <div className="flex justify-center">
          <ErrorMessage message={message} />
        </div>
      )}

      <div className="mt-6">
        <span className="block w-full rounded-md shadow-sm">
          <SubmitBtn
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
          >
            Create account
          </SubmitBtn>
        </span>
      </div>
    </Form>
  );
}

export default memo(RegisterForm);
