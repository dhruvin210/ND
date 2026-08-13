import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NewsletterSection } from "@/components/layout/NewsletterSection";
import { SocialSidebar } from "@/components/layout/SocialSidebar";
import { ChatWidget } from "@/components/chatbot/ChatWidget";
import { Analytics } from "@/components/analytics/Analytics";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const homeMetadata = buildMetadata({
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  path: "/",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  ...homeMetadata,
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  keywords: [
    "AI agent development",
    "generative AI solutions",
    "custom software development",
    "enterprise AI transformation",
    "cloud engineering",
    "RAG systems",
    "digital transformation company",
  ],
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/icons/apple-icon-180x180.png",
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <SocialSidebar />
        <main id="main">{children}</main>
        <NewsletterSection />
        <Footer />
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  );
}
