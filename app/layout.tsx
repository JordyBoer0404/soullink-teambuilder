import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Soullink Team Builder",
  description: "Simple website to create soullink pokemon teams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
