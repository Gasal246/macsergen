import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Macsergen",
  description: "MACSERGEN - (MAC)Id (SER)IALId (GEN)ERATOR is a unique macId and serial id generator for products of Wideline IT Solutions (#muhammedgasal).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-zinc-950 to-zinc-800 w-full h-screen overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
