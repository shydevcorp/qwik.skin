import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (request.nextUrl.pathname.startsWith("/api/auth")) {
    response.headers.append("Access-Control-Allow-Credentials", "true");

    if (process.env.NODE_ENV === "production") {
      const origin = request.headers.get("origin") || "https://www.qwik.skin";
      response.headers.append("Access-Control-Allow-Origin", origin);
    } else {
      response.headers.append("Access-Control-Allow-Origin", "*");
    }

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
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
