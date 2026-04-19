/**
 * Global site configuration (paths, display names).
 * Prefer `process.env.NEXT_PUBLIC_*` here when you add environment-driven values.
 */
export const siteConfig = {
  name: "Evidence of Greatness",
  description: "Turn bad days into proud moments—collect wins for you or someone you love.",
  routes: {
    home: "/",
    collect: "/collect",
    dashboard: "/dashboard",
    login: "/auth/login",
    signup: "/auth/signup",
  },
} as const;
