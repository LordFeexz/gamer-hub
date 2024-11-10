import type { BasePagination, PageProps } from "@/interfaces";
import { sanitize_search_params } from "@/lib/utils";
import { get_games } from "@/modules/game/action";
import Home from "@/modules/home";

export interface HomePageSearchParams extends BasePagination {
  q?: string;
}

export default async function Page({
  searchParams,
}: PageProps<null, HomePageSearchParams>) {
  const [{ page = "1", limit = "10", q = null }, games] = await Promise.all([
    sanitize_search_params(searchParams),
    get_games(),
  ]);
  //TODO
  return (
    <Home
      query={{ page, limit, q }}
      banners={[]}
      games={games.map(({ code, image_url, name }) => ({
        name,
        image: image_url,
        code,
      }))}
    />
  );
}
