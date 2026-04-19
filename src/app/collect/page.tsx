import type { Metadata } from "next";

import { CollectPage } from "@/page/collect-page";

export const metadata: Metadata = {
  title: "Your memory collection",
  description: "Add proud moments with dates, stories, and images.",
};

export default function CollectPageRoute() {
  return <CollectPage />;
}
