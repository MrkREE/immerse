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
  title: "Immerse — Master Any Language",
  description: "Speak with an AI that adapts to you. Master any of 50+ languages through real conversations, instant feedback, and an immersive experience built for fluency.",
  openGraph: {
    title: "Immerse — Master Any Language",
    description: "Voice AI language learning through real conversation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-black text-white min-h-full overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
