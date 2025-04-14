import { authOptions } from "@/lib/auth/auth";
import NextAuth from "next-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
