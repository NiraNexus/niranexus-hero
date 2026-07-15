import type { Metadata } from 'next';
import { ScrollToTop } from '@/components/ScrollToTop';

export const metadata: Metadata = {
  title: 'Privacy Policy — NiraNexus',
  description: 'How NiraNexus Ltd collects, processes, and protects your data under UK GDPR.',
};

export default function PrivacyPage() {
  return (
    <main style={{ backgroundColor: '#05070f', color: '#cbd5e1', minHeight: '100vh', fontFamily: 'var(--font-body)', padding: '4rem 2rem', maxWidth: 720, margin: '0 auto', lineHeight: 1.7 }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', marginBottom: '2rem' }}>
        <a href="/" style={{ color: '#00ebd4', textDecoration: 'none' }} className="hover:underline">&larr; NiraNexus home</a>
      </p>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#ffffff', marginBottom: '0.5rem' }}>Privacy Policy</h1>
      <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '2.5rem' }}>Last updated: 1 July 2026</p>

      <Section heading="1. Who We Are">
        NiraNexus Ltd is a company registered in England and Wales. We operate the Model Council — a multi-model AI deliberation infrastructure service — at model-council.niranexus.com.
      </Section>
      <Section heading="Contact">
        For privacy matters, contact: legal@niranexus.com.
      </Section>

      <Section heading="2. Data We Collect">
        <List items={[
          '<strong>Authentication data:</strong> Your email address, provided when you sign in via Google OAuth or email magic link.',
          '<strong>OAuth profile data:</strong> If you sign in with Google, we receive your name, email address, and profile avatar from Google.',
          '<strong>Debate data:</strong> The prompts you submit, the model responses generated, and the synthesis verdicts produced by the Model Council.',
          '<strong>Session data:</strong> A session cookie is set by Supabase Auth to maintain your authenticated state.',
        ]} />
      </Section>

      <Section heading="3. How We Use Your Data">
        <List items={[
          '<strong>Authentication:</strong> Your email and OAuth data are used solely to authenticate you and maintain your session.',
          '<strong>Service operation:</strong> Debate prompts and responses are stored to provide the deliberation service and display your history.',
          '<strong>No training:</strong> Your prompts and debate data are never used to train AI models.',
          '<strong>No sale:</strong> We do not sell, rent, or share your data with third parties for marketing or any other purpose.',
        ]} />
      </Section>

      <Section heading="4. Data Processors">
        We use the following third-party services to operate the Model Council:
        <List items={[
          '<strong>Supabase:</strong> Database and authentication provider. Your data is stored in Supabase\'s EU-hosted infrastructure.',
          '<strong>OpenRouter:</strong> Model inference provider. Your prompts are transmitted to frontier AI models via OpenRouter\'s API for the duration of each debate round.',
          '<strong>Google:</strong> OAuth identity provider. If you sign in with Google, Google processes your authentication request under their own privacy policy.',
        ]} />
      </Section>

      <Section heading="5. Cookies">
        The Model Council uses exactly one cookie: a session cookie set by Supabase Auth. This cookie is strictly necessary for authentication — without it, you cannot remain signed in.
        <br /><br />
        We do not use analytics cookies, tracking cookies, or any third-party cookies. The session cookie expires when you close your browser.
      </Section>

      <Section heading="6. Your Rights">
        Under UK GDPR, you have the right to:
        <List items={[
          '<strong>Access:</strong> Request a copy of the personal data we hold about you.',
          '<strong>Rectification:</strong> Correct any inaccurate or incomplete data.',
          '<strong>Erasure:</strong> Request deletion of your account and all associated data.',
          '<strong>Portability:</strong> Receive your data in a structured, machine-readable format.',
        ]} />
        To exercise any of these rights, email legal@niranexus.com. We respond within 30 days.
      </Section>

      <Section heading="7. Data Retention">
        Your debate history, prompts, and model responses are retained for as long as your account exists. When you delete your account, all associated data is permanently deleted from our systems. Session cookies expire when you close your browser.
      </Section>

      <Section heading="8. Changes to This Policy">
        If this policy changes, the updated version is posted to this page with a new effective date. We do not send email notifications for policy updates.
      </Section>

      <ScrollToTop />
    </main>
  );
}

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#00ebd4', marginTop: '2rem', marginBottom: '0.75rem' }}>{heading}</h2>
      {children}
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontSize: '0.9rem', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: item }} />
      ))}
    </ul>
  );
}
