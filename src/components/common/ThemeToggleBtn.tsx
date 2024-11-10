"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { memo, useCallback } from "react";
import useMount from "@/hooks/useMounted";
import { cn } from "@/lib/utils";
import type { OptionClassName } from "@/interfaces/component";

export interface ThemeToggleBtnProps extends OptionClassName {}

function ThemeToggleBtn({ className }: ThemeToggleBtnProps) {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  }, [resolvedTheme, setTheme]);

  const mounted = useMount();

  if (!mounted) return null;

  return (
    <motion.button
      id="dark-mode-switcher"
      aria-label="Toggle Theme"
      onClick={toggleTheme}
      className={cn(
        "rounded-xl p-2",
        "border dark:stroke-slate-950 stroke-gray-100",
        "hover:cursor-pointer hover:scale-95 duration-300 transition-transform",
        className
      )}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      whileHover={{ scale: 0.95 }}
    >
      {resolvedTheme === "dark" ? (
        <SunIcon className="h-4 w-4 hover:opacity-75 transition-opacity duration-300" />
      ) : (
        <MoonIcon className="h-4 w-4 hover:opacity-75 transition-opacity duration-300" />
      )}
    </motion.button>
  );
}

export default memo(ThemeToggleBtn);
