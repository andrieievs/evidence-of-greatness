import type { Metadata } from "next";

import { CollectShell } from "@/features/proud-moments";

export const metadata: Metadata = {
  title: "Your memory collection",
  description: "Add proud moments with dates, stories, and images.",
};

export default function CollectRoute() {
  return <CollectShell />;
}
