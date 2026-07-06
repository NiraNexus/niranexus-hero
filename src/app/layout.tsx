import type { Metadata } from "next";
import { DM_Serif_Display, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";
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
  title: "NiraNexus | Agentic Infrastructure & Deliberative AI Governance",
  description: "NiraNexus-OS is a governance-first agentic infrastructure. We replace speculative generation with adversarial deliberation to ensure verifiable, audited output for high-stakes operational workflows.",
  icons: {
    icon: "/favicon.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "NiraNexus-OS | Deliberative Infrastructure for Agentic Workflows",
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
        <footer style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#64748b' }}>
            <a href="https://niranexus.com" style={{ color: '#00EBD4', textDecoration: 'none' }} className="hover:underline focus-visible:ring-2 focus-visible:ring-[#00EBD4] focus-visible:outline-none rounded px-0.5">NiraNexus-OS</a> &copy; {new Date().getFullYear()} {'—'} Founded by Rakesh Maheswaran. Agentic infrastructure, not a wrapper.
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#64748b', marginTop: '0.5rem' }}>
            NiraNexus Ltd — Registered in England and Wales &nbsp;|&nbsp; <a href="https://model-council.niranexus.com/faq" style={{ color: '#64748b' }}>FAQ</a> &nbsp;|&nbsp; <a href="/privacy" style={{ color: '#64748b' }}>Privacy</a> &nbsp;|&nbsp; <a href="/terms" style={{ color: '#64748b' }}>Terms</a>
          </p>
        </footer>
      </body>
    </html>
  );
}
