import { memo } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface Game {
  image: string;
  code: string;
  name: string;
}

export interface GameScrollerProps {
  games: Game[];
}

function GameScroller({ games = [] }: GameScrollerProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-4 group/game-card">
        {games.map((game) => (
          <Link
            key={game.name}
            href={`/game/${game.code}`}
            passHref
            className="hover:scale-105 transition-transform duration-300"
          >
            <Avatar
              className={cn(
                "w-[4.25rem] h-[4.25rem] hover:cursor-pointer hover:opacity-100",
                "group-hover/game-card:[&:not(:hover)]:opacity-30",
                "transition-all duration-300",
                "shadow-none hover:shadow-lg"
              )}
            >
              <AvatarImage className="overflow-visible" src={game.image} />
              <AvatarFallback>{game.code}</AvatarFallback>
            </Avatar>
          </Link>
        ))}
      </div>
      <ScrollBar className="mt-4" orientation="horizontal" />
    </ScrollArea>
  );
}

export default memo(GameScroller);
