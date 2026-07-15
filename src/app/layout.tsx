import type { Metadata } from "next";
import { DM_Serif_Display, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import NiraNexusFooter from '../../../../Root_Repo/footer';
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-body",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "NiraNexus | Operating System for Auditable Deliberation",
  description: "NiraNexus-OS is hardened infrastructure for adversarial multi-model deliberation. Model Council executes the pipeline. Veritas certifies professional-grade artifacts. The Record provides cross-system provenance. Same pipeline, same governance.",
  icons: {
    icon: "/favicon.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "NiraNexus-OS | Operating System for Auditable Deliberation",
    description: "Hardened agentic infrastructure powered by multi-model adversarial deliberation. Governance-first, not a wrapper.",
    siteName: "NiraNexus",
    type: "website",
    images: [{ url: "https://niranexus.com/og-image.svg", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "NiraNexus",
  "url": "https://niranexus.com",
  "description": "Governance-first agentic infrastructure utilizing multi-model adversarial deliberation for verifiable AI output.",
  "founder": {
    "@type": "Person",
    "name": "Rakesh Maheswaran",
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
        className={`${dmSerifDisplay.variable} ${sourceSerif4.variable} ${ibmPlexMono.variable} antialiased`}
        style={{
          backgroundColor: '#05070f',
          color: '#cbd5e1',
          fontFamily: 'var(--font-body)',
        }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
        <NiraNexusFooter project="hub" />
      </body>
    </html>
  );
}
