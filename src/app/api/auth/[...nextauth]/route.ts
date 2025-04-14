import { authOptions } from "@/lib/auth/auth";
import NextAuth from "next-auth";

// Fix for CLIENT_FETCH_ERROR with NextAuth in development
// Ensures cross-origin requests are properly handled
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
