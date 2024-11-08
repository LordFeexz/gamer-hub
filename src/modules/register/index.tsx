import { memo } from "react";
import Hydrate from "./components/Hydrate";
import AuthNavbar from "@/components/common/AuthNavbar";
import Container from "@/components/common/Container";
import LazyLoadImg from "@/components/common/LazyLoadImage";
import { LOGO_BLUE } from "@/components/images";
import Link from "next/link";
import RegisterForm from "./components/Form";

export interface RegisterPageProps {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function RegisterPage({
  username,
  email,
  password,
  confirmPassword,
}: RegisterPageProps) {
  return (
    <>
      <Hydrate />
      <AuthNavbar />
      <Container
        data-aos="fade-up"
        as="main"
        className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-6 mt-8"
      >
        <hgroup className="w-full max-w-md">
          <LazyLoadImg
            height={40}
            width={40}
            className="mx-auto h-10 w-auto"
            src={LOGO_BLUE}
            alt="forum gamer logo"
          />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-neutral-900 dark:text-neutral-300">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w gap-4">
            Or{" "}
            <Link
              prefetch
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              login to your account
            </Link>
          </p>
        </hgroup>
        <section className="mt-8 w-full dark:bg-gray-800 max-w-md bg-white rounded-xl shadow-lg dark:border-gray-700 border-2 border-indigo-300">
          <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <RegisterForm {...{ username, email, password, confirmPassword }} />
          </div>
        </section>
      </Container>
    </>
  );
}

export default memo(RegisterPage);
