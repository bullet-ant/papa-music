import type { Metadata, Viewport } from "next";
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
  title: "Papa Music",
  description: "Download audio from YouTube with ease",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Papa Music",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Papa Music",
    title: "Papa Music - YouTube Audio Downloader",
    description: "Download audio from YouTube with ease",
  },
  twitter: {
    card: "summary",
    title: "Papa Music",
    description: "Download audio from YouTube with ease",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover"
        />
        <meta name="application-name" content="Papa Music" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Papa Music" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link
          rel="icon"
          type="image/svg+xml"
          sizes="192x192"
          href="/icon-192x192.svg"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          sizes="512x512"
          href="/icon-512x512.svg"
        />
        <link rel="apple-touch-icon" href="/icon-192x192.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        {children}
      </body>
    </html>
  );
}
