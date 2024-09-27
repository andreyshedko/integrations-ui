import type { Metadata } from "next";
import "./global.css";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Integrations",
  description: "Integrations Dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
