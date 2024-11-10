import {
  HomeIcon,
  MessageSquareIcon,
  PlusCircleIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { memo } from "react";

function FooterNav() {
  const LINKS = [
    {
      href: "/home",
      icon: <HomeIcon className="h-10 w-10" />,
    },
    {
      href: "/search",
      icon: <SearchIcon className="h-10 w-10" />,
    },
    {
      href: "/create",
      icon: <PlusCircleIcon className="h-10 w-10" />,
    },
    {
      href: "/chat",
      icon: <MessageSquareIcon className="h-10 w-10" />,
    },
    {
      href: "/profile",
      icon: <UserIcon className="h-10 w-10" />,
    },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300 border-t p-4">
      <nav className="flex justify-around bg-white dark:bg-gray-800">
        {LINKS.map(({ href, icon }) => (
          <Link href={href} prefetch passHref key={href}>
            <Button variant="ghost">{icon}</Button>
          </Link>
        ))}
      </nav>
    </footer>
  );
}

export default memo(FooterNav);
