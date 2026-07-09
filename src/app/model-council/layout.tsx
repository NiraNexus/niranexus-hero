import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Model Council | NiraNexus-OS Adversarial Deliberation Engine",
  description: "The adversarial engine of NiraNexus-OS. Multi-model cross-examination pipeline with auditable Evidence Basis and provenance-signed verdicts. Opening Statements → Cross-Examination → Rebuttal → Synthesis.",
  openGraph: {
    title: "Model Council | NiraNexus-OS Adversarial Deliberation Engine",
    description: "The adversarial engine of NiraNexus-OS. Multi-model cross-examination with provenance-signed verdicts.",
    siteName: "NiraNexus",
    type: "website",
    images: [{ url: "https://niranexus.com/og-image.svg", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Model Council: NiraNexus-OS Adversarial Deliberation Engine",
  "author": {
    "@type": "Person",
    "name": "Rakesh Maheswaran",
  },
  "description": "The adversarial engine of NiraNexus-OS. Multi-model cross-examination pipeline with auditable Evidence Basis and provenance-signed verdicts.",
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
