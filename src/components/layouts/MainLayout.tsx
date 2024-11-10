import Container from "../common/Container";
import type { ChildrenProps } from "@/interfaces/component";
import { memo } from "react";
import FooterNav from "./FooterNav";
import AuthorizedNavbar from "./AuthorizedNavbar";

function MainLayout({ children }: ChildrenProps) {
  return (
    <main
      data-testid="container"
      data-aos="fade-up"
      data-aos-duration="300"
      className=" space-y-8 block h-full min-h-svh"
    >
      <AuthorizedNavbar />
      <Container>{children}</Container>
      <FooterNav />
    </main>
  );
}

export default memo(MainLayout);
