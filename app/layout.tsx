import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Charlie Delta — Links",
  description: "All of Charlie Delta's platforms and favorite things in one place.",
  icons: {
    icon: "/CharlieDelta_Logo_Transparent_1000x.png",
    shortcut: "/CharlieDelta_Logo_Transparent_1000x.png",
    apple: "/CharlieDelta_Logo_Transparent_1000x.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
