import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import prisma from "./db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";

export const { handlers, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Google,
    Credentials({
      credentials: {
        name: {},
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const newUser = await prisma.user.findUnique({
          where: {
            name: credentials.name,
            email: credentials.email,
          },
        });

        if (newUser) {
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            newUser.password
          );

          if (passwordMatch) {
            return newUser;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
