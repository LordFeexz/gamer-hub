import Link from "next/link";
import { memo } from "react";
import LazyLoadImg from "../common/LazyLoadImage";
import { LOGO_BLUE } from "../images";
import AnimatedInput from "../ui/AnimatedInput";
import { Search } from "lucide-react";
import ThemeToggleBtn from "../common/ThemeToggleBtn";
import SignoutBtn from "../common/SignoutBtn";
import NavMenu from "../mobile/NavMenu";

function AuthorizedNav() {
  return (
    <header className="mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300 rounded-b-xl border-b">
      <div className="flex items-center justify-between h-16">
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center">
            <LazyLoadImg
              src={LOGO_BLUE}
              alt="logo"
              width={40}
              height={40}
              className="hover:opacity-90 transition-opacity duration-300 hover:scale-[98.5%]"
              wrapperClassName="rounded-full bg-white dark:bg-gray-800"
            />
          </Link>
        </div>

        <div className="flex-1 mx-4">
          <div className="relative w-full max-w-md mx-auto">
            {/* TODO  */}
            <AnimatedInput
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggleBtn />
          <SignoutBtn />
        </div>
        <NavMenu />
      </div>
    </header>
  );
}

export default memo(AuthorizedNav);
