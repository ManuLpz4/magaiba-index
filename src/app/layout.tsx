import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Magaiba Gentleness Index",
  description: "Magaiba Gentleness Index",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/images/favicon.jpeg" sizes="any" />
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
