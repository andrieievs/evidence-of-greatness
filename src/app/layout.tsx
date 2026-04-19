import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { AuthProvider } from "@/components/providers/auth-provider";
import { SiteHeader } from "@/components/site-header";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} flex min-h-screen flex-col`}>
        <AuthProvider>
          <SiteHeader />
          <div className="flex-1">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
