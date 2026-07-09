import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Veritas | NiraNexus-OS Professional Deliberation Engine",
  description: "The NiraNexus Engine, precision-tuned for professional expertise. Adversarial deliberation for legal, accounting, and consulting. Provenance-signed artifacts backed by the NiraNexus Record.",
  openGraph: {
    title: "Veritas | NiraNexus-OS Professional Deliberation Engine",
    description: "Professional-grade adversarial deliberation. Every output produces a provenance-signed, regulator-ready artifact.",
    siteName: "NiraNexus",
    type: "website",
    images: [{ url: "https://niranexus.com/og-image.svg", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Veritas: NiraNexus-OS Professional Deliberation Engine",
  "author": {
    "@type": "Person",
    "name": "Rakesh Maheswaran",
  },
  "description": "Professional-grade adversarial deliberation for legal, accounting, and consulting. Provenance-signed artifacts backed by the NiraNexus Record cross-system audit trail.",
  "isAccessibleForFree": false,
};

export default function VeritasLayout({ children }: { children: React.ReactNode }) {
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