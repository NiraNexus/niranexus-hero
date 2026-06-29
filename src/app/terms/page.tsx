import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — NiraNexus",
};

import { ScrollToTop } from "@/components/ScrollToTop";

export default function TermsPage() {
  return (
    <main style={{ backgroundColor: '#05070f', color: '#cbd5e1', minHeight: '100vh', fontFamily: 'var(--font-body)', padding: '4rem 2rem', maxWidth: 720, margin: '0 auto', lineHeight: 1.7 }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', marginBottom: '2rem' }}>
        <a href="/" style={{ color: '#00ebd4' }}>&larr; Back to NiraNexus</a>
      </p>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#ffffff', marginBottom: '2rem' }}>Terms of Service</h1>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>Last updated: June 29, 2026</p>

      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#ffffff', marginTop: '2rem', marginBottom: '0.75rem' }}>1. Acceptance</h2>
      <p>By accessing NiraNexus services, you agree to these terms. If you do not agree, do not use the service.</p>

      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#ffffff', marginTop: '2rem', marginBottom: '0.75rem' }}>2. Service Description</h2>
      <p>NiraNexus provides AI infrastructure and deliberation tools, including the Model Council. Services are provided "as is" and may change or be discontinued without notice.</p>

      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#ffffff', marginTop: '2rem', marginBottom: '0.75rem' }}>3. Free Tier & Quotas</h2>
      <p>The Model Council free tier includes 21 debates with progressive cooldowns. Quotas are enforced automatically. NiraNexus reserves the right to modify quota limits at any time.</p>

      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#ffffff', marginTop: '2rem', marginBottom: '0.75rem' }}>4. Acceptable Use</h2>
      <p>You agree not to use NiraNexus services for any unlawful purpose, to generate harmful content, or to attempt to circumvent security measures including Row-Level Security policies and authentication gates.</p>

      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#ffffff', marginTop: '2rem', marginBottom: '0.75rem' }}>5. Limitation of Liability</h2>
      <p>NiraNexus Ltd shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services. AI-generated content is produced by third-party models and does not represent the views of NiraNexus.</p>

      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#ffffff', marginTop: '2rem', marginBottom: '0.75rem' }}>6. Governing Law</h2>
      <p>These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the English courts.</p>

      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#ffffff', marginTop: '2rem', marginBottom: '0.75rem' }}>7. Contact</h2>
      <p>For legal inquiries: legal@niranexus.com</p>

      <p style={{ marginTop: '3rem', color: '#64748b', fontSize: '0.85rem' }}>
        NiraNexus Ltd — Registered in England and Wales.
      </p>
      <ScrollToTop />
    </main>
  );
}
