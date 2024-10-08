import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KBB",
  description: "Kabubuhan Banjar Sadunia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/kbb-icon.png" type="image/png" />
        
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
