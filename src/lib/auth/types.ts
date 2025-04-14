import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    steamId?: string;
    steamUsername?: string;
    steamAvatar?: string;
  }

  interface Session {
    user: {
      id: string;
      steamId?: string;
      steamUsername?: string;
      steamAvatar?: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
    steamId?: string;
    steamUsername?: string;
    steamAvatar?: string;
  }
}
