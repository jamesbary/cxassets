import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { type DefaultSession } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import Resend from "next-auth/providers/resend";

import authConfig from "@/auth.config";
import { appConfig } from "@/config";
import { db } from "@/db";
import { env } from "@/env";
import { authWithCredentials } from "@/lib/actions";
import { getUserById } from "@/lib/queries/user";
import type { Role } from "@/types";

type AddOns = {
  role: Role;
  username: string | null;
  status: "active" | "closed";
};
export type AuthUser = DefaultSession["user"] & AddOns;

declare module "next-auth" {
  interface Session {
    user: AuthUser;
  }
  interface User {
    role: Role;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends AddOns {}
}

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: appConfig.auth.signin.href,
    newUser: appConfig.auth.onboarding.href,
    verifyRequest: appConfig.auth.verification.href,
    error: appConfig.auth.error.href,
    signOut: appConfig.auth.signout.href,
  },
  ...authConfig,
  providers: [
    Resend({ from: "onboarding@resend.dev" }),
    Credentials({
      authorize: async (credentials) => {
        try {
          const user = await authWithCredentials(credentials);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.role = user.role;
      if (!user && token.sub) {
        const u = await getUserById(token.sub);
        if (u) {
          token.role = u.role;
          token.picture = u.image;
          token.username = u.username;
          token.status = u.status;
        }
      }
      return token;
    },
    session({ session, token }) {
      if (token.sub) session.user.id = token.sub;
      session.user.role = token.role;
      session.user.username = token.username;
      session.user.status = token.status;
      return session;
    },
  },
  adapter: DrizzleAdapter(db) as Adapter,
  secret: env.AUTH_SECRET,
});
