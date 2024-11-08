import Container from "@/components/common/Container";
import LazyLoadImg from "@/components/common/LazyLoadImage";
import { LOGO_BLUE } from "@/components/images";
import Link from "next/link";
import AuthNavbar from "@/components/common/AuthNavbar";
import Hydrate from "./components/Hydrate";
import LoginForm from "./components/LoginForm";
import { memo } from "react";

export interface LoginPageProps {
  identifier?: string;
  password?: string;
}

function LoginPage({ identifier, password }: LoginPageProps) {
  return (
    <>
      <Hydrate />
      <AuthNavbar />
      <Container
        as="main"
        data-aos="fade-up"
        className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-6 mt-8"
      >
        <hgroup className="w-full max-w-md flex items-center justify-center flex-col">
          <Link prefetch href="/" className="mx-auto h-10 w-auto">
            <LazyLoadImg
              width={40}
              height={40}
              className="w-8 h-8 mr-2"
              src={LOGO_BLUE}
              alt="forum gamers logo"
            />
          </Link>
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
            Login to your account
          </h1>
        </hgroup>

        <section className="mt-8 w-full max-w-md bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
          <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <LoginForm defaultValue={{ identifier, password }} />
          </div>
        </section>
      </Container>
    </>
  );
}

export default memo(LoginPage);
