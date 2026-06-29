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
  title: "NiraNexus — Agentic Operating System",
  description: "Hardened deliberative AI infrastructure. Multi-model deliberation, persistent governance, systems-grade architecture. Founded by Rakesh Maheswaran.",
  icons: {
    icon: "/favicon.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "NiraNexus — Agentic Operating System",
    description: "Hardened deliberative AI infrastructure. Not a chatbot — an Agentic Fortress.",
    siteName: "NiraNexus",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}
