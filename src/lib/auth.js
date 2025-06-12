import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import prisma from "./db";

export const { handlers, auth } = NextAuth({
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
            password: credentials.password,
          },
        });

        if (newUser) {
          console.log("ACCESS");
          return newUser;
        } else {
          return null;
        }
      },
    }),
  ],
});
