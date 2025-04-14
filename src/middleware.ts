import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (request.nextUrl.pathname.startsWith("/api/auth")) {
    response.headers.append("Access-Control-Allow-Credentials", "true");
    response.headers.append("Access-Control-Allow-Origin", "*");
    response.headers.append(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    );
    response.headers.append(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    );

    if (request.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 200,
        headers: response.headers,
      });
    }
  }

  return response;
}

export const config = {
  matcher: "/api/auth/:path*",
};
