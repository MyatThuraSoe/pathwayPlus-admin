import { useRouter } from "next/router";
import { ReactNode } from "react";
import Header from "./Header";
import SideBar from "./SideBar";

const pagesWithoutHeader = ["/", "/login", "/reset", "/404"];

const Layout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useRouter();

  const hasHeader = !pagesWithoutHeader.includes(pathname);
  return (
    <>
      {hasHeader && <Header />}
      <div className="flex">
        {hasHeader && <SideBar />}
        <main className="h-full w-full">{children}</main>
      </div>
    </>
  );
};

export default Layout;
