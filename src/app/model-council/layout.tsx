import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Model Council: Deliberative AI Infrastructure | NiraNexus-OS | Hardened",
  description: "Model Council is the deliberative engine of NiraNexus-OS. Frontier models cross-examine assumptions to produce verified, audited output. Governance-first infrastructure for mission-critical agentic workflows.",
  openGraph: {
    title: "NiraNexus Model Council: Governance-First AI Deliberation",
    description: "An engineering specification for the multi-model deliberation stack powering NiraNexus-OS.",
    siteName: "NiraNexus",
    type: "website",
    images: [{ url: "https://niranexus.com/og-image.svg", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Model Council: Technical Deep Dive",
  "author": {
    "@type": "Person",
    "name": "Rakesh Maheswaran",
  },
  "description": "An engineering specification for the deliberative infrastructure powering NiraNexus-OS.",
  "isAccessibleForFree": false,
};

export default function ModelCouncilLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
