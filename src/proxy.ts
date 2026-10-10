
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const session = request.cookies.get("better-auth.session_token");

  if (!session) {
    return NextResponse.redirect(new URL("/singin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/products/:path*",
   
    "/profile/:path*",
  ],
};
