import type { Metadata } from "next";
// This line is slightly updated for the new package version
import { Inter, Geist_Mono, Yeseva_One, Work_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({ // Updated from Geist_Mono to GeistMono
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const yesevaOne = Yeseva_One({
  variable: "--font-yeseva-one",
  subsets: ["latin"],
  weight: "400",
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "MEDDICAL - Medical Services",
  description: "Professional medical services in Nairobi, Kenya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${yesevaOne.variable} ${workSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}