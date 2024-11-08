import { memo } from "react";
import ThemeToggleBtn from "./ThemeToggleBtn";
import LazyLoadImg from "./LazyLoadImage";
import { LOGO_BLUE } from "../images";

function AuthNavbar() {
  return (
    <header className="flex justify-between items-center p-4 bg-blue-500">
      <div className="flex justify-center items-center gap-2">
        <LazyLoadImg
          src={LOGO_BLUE}
          alt="forum gamers logo"
          width={40}
          height={40}
          className="hover:opacity-90 transition-opacity duration-300 hover:scale-[98.5%]"
          wrapperClassName="rounded-full bg-primary"
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
