import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api|_next|assets|favicon.ico).*)"],
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const token = req.cookies.get("token");

  if (token === undefined) {
    url.pathname = "/login";
    return NextResponse.rewrite(url);
  } else {
    return NextResponse.next();
  }
}