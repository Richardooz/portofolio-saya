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
  title: {
    default: "Richardo.dev - Portfolio",
    template: "%s | Richardo.dev",
  },
  description:
    "Information Systems Student & Full Stack Developer passionate about Laravel and web development",
  keywords: [
    "Portfolio",
    "Web Developer",
    "Laravel",
    "React",
    "Next.js",
    "Richardo",
  ],
  authors: [{ name: "Richardo Danuarta" }],
  creator: "Richardo Danuarta",
  metadataBase: new URL("https://portofolio-saya-richardooz.vercel.app"),
  openGraph: {
    title: "Richardo.dev - Portfolio",
    description:
      "Information Systems Student & Full Stack Developer passionate about Laravel and web development",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Richardo.dev - Portfolio",
    description:
      "Information Systems Student & Full Stack Developer passionate about Laravel and web development",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
