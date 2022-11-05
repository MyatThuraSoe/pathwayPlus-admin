import { ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { setCookie, getCookies } from "cookies-next";

export { RouteGuard };

function RouteGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

  }, []);

  function authCheck(url: string) {
    // redirect to login page if accessing a private page and not logged in
    const { token } = getCookies();
    const publicPaths = ["/login"];
    const path = url.split("?")[0];
    if (token === undefined && !publicPaths.includes(path)) {
      setAuthorized(false);
      setCookie("returnUrl", router.asPath);
      router.push({ pathname: "/login" });
    } else {
      setAuthorized(true);
    }
  }

  return <>{authorized && children}</>;
}