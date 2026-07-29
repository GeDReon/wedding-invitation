import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { weddingConfig } from "@/lib/wedding-config";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: weddingConfig.seo.title,
  description: weddingConfig.seo.description,
  metadataBase: new URL(weddingConfig.seo.siteUrl),
  openGraph: {
    title: weddingConfig.seo.title,
    description: weddingConfig.seo.description,
    url: weddingConfig.seo.siteUrl,
    siteName: weddingConfig.seo.title,
    locale: "kk_KZ",
    type: "website",
    images: [
      {
        url: weddingConfig.hero.image,
        width: 1200,
        height: 630,
        alt: weddingConfig.seo.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: weddingConfig.seo.title,
    description: weddingConfig.seo.description,
    images: [weddingConfig.hero.image],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kk" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
