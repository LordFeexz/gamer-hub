import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BasePagination } from "@/interfaces";
import { memo } from "react";
import TournamentBanner, {
  type TournamentBannerProps,
} from "./components/TournamentBanner";
import GameScroller, { type Game } from "@/components/common/GameScroller";

export interface HomePageProps {
  query: Partial<BasePagination> & { q?: string | null };
  banners: TournamentBannerProps[];
  games: Game[];
}

function HomePage({ query = {}, banners = [], games = [] }: HomePageProps) {
  return (
    <Card
      as="section"
      className="border-none text-neutral-900 dark:text-neutral-300"
    >
      <CardHeader
        className="flex flex-row items-center justify-between"
        as="header"
      >
        <hgroup className="antialiased">
          <CardTitle>Upcoming Tournaments</CardTitle>
          <p className="text-sm text-gray-400">Upcoming and your tournaments</p>
        </hgroup>
      </CardHeader>
      <CardContent className="space-y-8">
        <GameScroller games={games} />

        {banners.map((banner) => (
          <TournamentBanner {...banner} key={banner.id} />
        ))}
      </CardContent>
    </Card>
  );
}

export default memo(HomePage);
