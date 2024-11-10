"use client";

import { memo, useCallback, useState } from "react";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import ThemeToggleBtn from "../common/ThemeToggleBtn";
import SignoutBtn from "../common/SignoutBtn";

function NavMenu() {
  const [open, setOpen] = useState<boolean>(false);

  const toggleDropdown = useCallback(() => setOpen(!open), [open]);

  return (
    <>
      <div className="flex md:hidden">
        <Button variant="outline" size="icon" onClick={toggleDropdown}>
          <Menu className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Open menu</span>
        </Button>
      </div>
      {open && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <ThemeToggleBtn className="w-full justify-start" />
            <SignoutBtn className="w-full justify-start" />
          </div>
        </div>
      )}
    </>
  );
}

export default memo(NavMenu);
