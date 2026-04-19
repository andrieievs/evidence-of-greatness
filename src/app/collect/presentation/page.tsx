import type { Metadata } from "next";

import { CollectPresentationPanel } from "@/features/proud-moments/components/collect-presentation-panel";
import { CollectShell } from "@/features/proud-moments/components/collect-shell";

export const metadata: Metadata = {
  title: "Presentation",
  description: "Review the proud moments you captured before sharing or saving elsewhere.",
};

export default function CollectPresentationRoute() {
  return (
    <CollectShell>
      <CollectPresentationPanel />
    </CollectShell>
  );
}
