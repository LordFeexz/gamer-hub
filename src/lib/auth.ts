import { verify_token, custom_token, custom_verify } from "@/helpers/jwt";
import type { CustomSession } from "@/interfaces";
import type { NextAuthOptions, Session, TokenSet } from "next-auth";
import type { JWT } from "next-auth/jwt";
import credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    credentials({
      name: "Credentials",
      credentials: {
        access_token: {
          placeholder: "access_token",
          type: "access_token",
          label: "access_token",
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.access_token) return null;

          const { id } = verify_token(credentials?.access_token);

          return {
            id,
            name: "user",
            access_token: credentials?.access_token,
          };
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  jwt: {
    decode({ secret, token }) {
      return custom_verify(token, secret) as JWT;
    },
    encode({ secret, token }) {
      return custom_token(token as JWT, secret);
    },
  },
  callbacks: {
    session({
      session,
      token,
    }: {
      session: Session | CustomSession | any;
      token: TokenSet;
    }) {
      session.user.id = token.id;
      session.user.access_token = token.access_token;

      return session;
    },
    jwt({
      token,
      user,
      account,
      profile,
      isNewUser,
    }: {
      token: JWT | any;
      user?: any;
      account?: any;
      profile?: any;
      isNewUser?: boolean | undefined;
    }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      if (account) {
        token.access_token = user?.access_token;
      }
      return token;
    },
  },
};
