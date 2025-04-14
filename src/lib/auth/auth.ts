import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import { prisma } from "@/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import "./types";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: "steam",
      name: "Steam",
      credentials: {
        steamId: { label: "Steam ID", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.steamId) {
          return null;
        }

        const steamId = credentials.steamId;

        const user = await prisma.user.findUnique({
          where: { steamId },
        });

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          steamId: user.steamId,
          steamUsername: user.steamUsername,
          steamAvatar: user.steamAvatar,
        };
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.steamId = user.steamId;
        token.steamUsername = user.steamUsername;
        token.steamAvatar = user.steamAvatar;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.steamId = token.steamId as string;
        session.user.steamUsername = token.steamUsername as string;
        session.user.steamAvatar = token.steamAvatar as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
