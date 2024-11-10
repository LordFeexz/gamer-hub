import MainLayout from "@/components/layouts/MainLayout";
import type { ChildrenProps } from "@/interfaces";

export default function HomeLayout({ children }: ChildrenProps) {
  return <MainLayout>{children}</MainLayout>;
}
