import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { NextResponse } from "next/server";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      id: "credentials",
      name: "Email & password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toString().toLowerCase().trim();
        const password = credentials?.password?.toString() ?? "";
        if (!email || !password) return null;

        const demoEmail = process.env.AUTH_DEMO_EMAIL?.toLowerCase().trim();
        const demoPassword = process.env.AUTH_DEMO_PASSWORD;
        if (demoEmail && demoPassword && email === demoEmail && password === demoPassword) {
          return { id: "demo-user", name: "Demo user", email: demoEmail };
        }

        return null;
      },
    }),
    ...(process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET ? [GitHub] : []),
    ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET ? [Google] : []),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname, search } = request.nextUrl;

      if (pathname === "/") {
        return true;
      }
      if (pathname.startsWith("/auth")) {
        return true;
      }
      if (auth?.user) {
        return true;
      }

      const login = new URL("/auth/login", request.url);
      const returnTo = `${pathname}${search}`;
      login.searchParams.set("callbackUrl", returnTo);
      return NextResponse.redirect(login);
    },
    jwt({ token, user }) {
      if (user?.id) {
        token.sub = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
