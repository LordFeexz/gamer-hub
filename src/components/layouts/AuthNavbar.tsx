import { memo } from "react";
import ThemeToggleBtn from "../common/ThemeToggleBtn";
import LazyLoadImg from "../common/LazyLoadImage";
import { LOGO_BLUE } from "../images";

function AuthNavbar() {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300 rounded-b-xl border-b">
      <div className="flex justify-center items-center gap-2">
        <LazyLoadImg
          src={LOGO_BLUE}
          alt="gamer hub logo"
          width={40}
          height={40}
          className="hover:opacity-90 transition-opacity duration-300 hover:scale-[98.5%]"
          wrapperClassName="rounded-full bg-white dark:bg-gray-800"
        />
        <h1 className="antialiased text-xl font-bold cursor-default">
          Gamer Hub
        </h1>
      </div>
      <ThemeToggleBtn />
    </header>
  );
}

export default memo(AuthNavbar);
