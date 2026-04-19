/**
 * Global site configuration (paths, display names).
 * Prefer `process.env.NEXT_PUBLIC_*` here when you add environment-driven values.
 */

/** Header + primary content: same max width and horizontal padding so edges line up */
export const appShellClass = "mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8";

export const siteConfig = {
  name: "Evidence of Greatness",
  description: "Turn bad days into proud moments—collect wins for you or someone you love.",
  routes: {
    home: "/",
    collect: "/collect",
    collectPresentation: "/collect/presentation",
    dashboard: "/dashboard",
  },
} as const;
