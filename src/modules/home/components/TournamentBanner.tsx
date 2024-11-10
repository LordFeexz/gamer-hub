import LazyLoadImg from "@/components/common/LazyLoadImage";
import { Button } from "@/components/ui/button";
import { display_date_range } from "@/helpers/global";
import { ArrowRightIcon } from "lucide-react";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { memo } from "react";

export interface TournamentBannerProps {
  src: string | StaticImageData;
  name: string;
  start_date: Date | string;
  end_date: Date | string;
  game_name: string;
  id: string;
}

function TournamentBanner({
  src,
  name,
  start_date,
  end_date,
  game_name,
  id,
}: TournamentBannerProps) {
  return (
    <article
      className="relative h-48 rounded-lg overflow-hidden mb-6"
      data-testid="banner"
    >
      <LazyLoadImg
        src={src}
        alt={`${name}-tournament-banner`}
        fill
        className="transition-transform hover:scale-105 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <hgroup className="absolute bottom-4 left-4">
        <p className="text-sm text-gray-300">
          {display_date_range(new Date(start_date), new Date(end_date))}
        </p>
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-sm">{game_name}</p>
      </hgroup>
      <Link prefetch passHref href={`/tournament/${id}`}>
        <Button
          size="icon"
          variant="ghost"
          className="absolute bottom-4 right-4"
        >
          <ArrowRightIcon className="h-6 w-6" />
        </Button>
      </Link>
    </article>
  );
}

export default memo(TournamentBanner);
