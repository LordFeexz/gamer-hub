import { NextResponse, type NextRequest } from "next/server";
import { LANGS } from "./constants/global";
import type { Lang } from "./interfaces";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const lang = url.searchParams.get("lang");

  if (!lang || !LANGS.includes(lang as Lang)) {
    url.searchParams.set("lang", "en");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|api|favicon.ico).*)",
};
