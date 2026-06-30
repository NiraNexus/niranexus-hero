import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Model Council — NiraNexus Technical Deep-Dive",
  description: "Engineering specification for the deliberative infrastructure powering NiraNexus-OS. Four-phase adversarial deliberation, Supabase persistence, governance-first architecture.",
  openGraph: {
    title: "Model Council — NiraNexus Technical Deep-Dive",
    description: "Four frontier models. Three deliberation rounds. One synthesized verdict. Governance-first infrastructure.",
    siteName: "NiraNexus",
    type: "website",
    images: [{ url: "https://niranexus.com/og-image.svg", width: 1200, height: 630 }],
  },
};

export default function ModelCouncilLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
