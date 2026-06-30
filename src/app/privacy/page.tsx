import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — NiraNexus",
};

import { ScrollToTop } from "@/components/ScrollToTop";

export default function PrivacyPage() {
  return (
    <main style={{ backgroundColor: '#05070f', color: '#cbd5e1', minHeight: '100vh', fontFamily: 'var(--font-body)', padding: '4rem 2rem', maxWidth: 720, margin: '0 auto', lineHeight: 1.7 }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', marginBottom: '2rem' }}>
        <a href="/" style={{ color: '#00ebd4' }}>&larr; Back to NiraNexus</a>
      </p>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#ffffff', marginBottom: '2rem' }}>Privacy Policy</h1>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>Last updated: June 29, 2026</p>

      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#ffffff', marginTop: '2rem', marginBottom: '0.75rem' }}>1. Who We Are</h2>
      <p>NiraNexus Ltd is registered in England and Wales. This privacy policy explains how we collect, use, and protect your personal data when you use our services.</p>

      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#ffffff', marginTop: '2rem', marginBottom: '0.75rem' }}>2. Data We Collect</h2>
      <p>When you sign in to the NiraNexus Model Council via Google OAuth, we receive your email address and name from Google. We do not collect any additional personal data.</p>

      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#ffffff', marginTop: '2rem', marginBottom: '0.75rem' }}>3. How We Use Your Data</h2>
      <p>Your email address is used solely for authentication purposes and to manage your access to our services, including quota enforcement and usage tracking. We do not sell, share, or process your data for marketing purposes.</p>

      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#ffffff', marginTop: '2rem', marginBottom: '0.75rem' }}>4. Data Storage</h2>
      <p>Your data is stored securely in Supabase, with Row-Level Security (RLS) policies enforced at the database layer. Authentication tokens are handled via JWT and OAuth 2.0 industry standards.</p>

      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#ffffff', marginTop: '2rem', marginBottom: '0.75rem' }}>5. Your Rights</h2>
      <p>Under UK GDPR, you have the right to access, rectify, or delete your personal data. To exercise these rights, contact us at the email address below.</p>

      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#ffffff', marginTop: '2rem', marginBottom: '0.75rem' }}>6. Contact</h2>
      <p>For privacy inquiries, contact: privacy@niranexus.com</p>

      <ScrollToTop />
    </main>
  );
}
