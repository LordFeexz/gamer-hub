import type { Lang } from "@/interfaces";
import type { ChildrenProps } from "@/interfaces/component";
import "@/components/styles/globals.css";
import "aos/dist/aos.css";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { memo, Suspense } from "react";
import TopLoader from "nextjs-toploader";
import Session from "../providers/Session";
import Theme from "../providers/Theme";
import { Inter, Sora } from "next/font/google";
import Hydrate from "./Hydrate";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export interface RootLayoutProps extends ChildrenProps {
  lang?: Lang;
}

function RootLayout({ children, lang = "en" }: RootLayoutProps) {
  return (
    <html lang={lang} suppressContentEditableWarning suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          sans.variable,
          sora.variable,
          "antialiased transition-colors duration-150 bg-gray-100 dark:bg-gray-900"
        )}
      >
        <Suspense>
          <Session>
            <Theme>
              <TopLoader
                color="#05b6d3"
                initialPosition={0.08}
                crawlSpeed={200}
                height={3}
                crawl
                showSpinner
                easing="ease"
                speed={200}
                shadow="0 0 10px #05b6d3,0 0 5px #45c6c0"
              />
              <Hydrate />
              {children}
            </Theme>
          </Session>
        </Suspense>
      </body>
    </html>
  );
}

export default memo(RootLayout);
