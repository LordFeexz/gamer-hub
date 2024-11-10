import type { Metadata } from "next";
import Root from "@/components/layouts/Root";
import type { PageProps } from "@/interfaces";
import type { ChildrenProps } from "@/interfaces/component";

export const metadata: Metadata = {
  title: "Gamer Hub",
};

export type RootLayoutProps = ChildrenProps & PageProps<null>;

export default async function RootLayout({ children }: RootLayoutProps) {
  return <Root>{children}</Root>;
}
