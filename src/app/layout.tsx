import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DesktopLayout from "@/components/DesktopLayout";
import DeviceWarning from "@/components/DeviceWarning";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aaditya's Macfolio",
  description: "Crafted pixel by pixel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{ margin: 0, padding: 0, overflow: 'hidden' }}
      >
        <DeviceWarning>
          <DesktopLayout>
            {children}
          </DesktopLayout>
        </DeviceWarning>
      </body>
    </html>
  );
}
