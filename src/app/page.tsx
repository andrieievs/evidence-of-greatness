import type { Metadata } from "next";

import { LandingPage } from "@/features/landing";

export const metadata: Metadata = {
  title: "When things get tough, remember how far you've come",
  description:
    "Turn your bad days into proud moments. A simple space to store your wins—or celebrate a friend's journey when they need a lift.",
};

export default function HomePage() {
  return <LandingPage />;
}
