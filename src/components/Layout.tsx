import { useRouter } from "next/router";
import { ReactNode } from "react";
import Header from "./Header";

const pagesWithoutHeader = ["/", "/login"];

const Layout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useRouter();

  const hasHeader = !pagesWithoutHeader.includes(pathname);
  return (
    <>
      {hasHeader && <Header />}
      <main>{children}</main>
    </>
  );
};

export default Layout;
