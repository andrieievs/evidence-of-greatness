import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist } from "next/font/google";

import { siteConfig } from "@/config/site";

import "@/styles/globals.css";

const geistSans = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

function Providers({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} min-h-screen`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
