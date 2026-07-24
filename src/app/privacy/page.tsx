import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — NiraNexus',
  description: 'How NiraNexus Ltd collects, processes, and protects your data under UK GDPR.',
};

export default function PrivacyPage() {
  return (
    <>
      <a
        href="/"
        aria-label="NiraNexus home"
        style={{ display: 'inline-block', fontFamily: 'var(--font-display)', fontSize: '0.8rem', color: '#00ebd4', textDecoration: 'underline', textShadow: '0 0 10px rgba(0, 235, 212, 0.3)', position: 'absolute', top: '1.5rem', left: '2rem', zIndex: 10, outline: 'none' }}
        className="focus-visible:ring-2 focus-visible:ring-[#00ebd4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070f] rounded"
      >
        &larr; NiraNexus Home
      </a>
      <main id="top" style={{ backgroundColor: '#05070f', color: '#cbd5e1', minHeight: '100vh', fontFamily: 'var(--font-body)', padding: '2rem 2rem 6rem', maxWidth: 720, margin: '0 auto', lineHeight: 1.7 }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#ffffff', marginBottom: '0.5rem' }}>Privacy Policy</h1>
      <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '2.5rem' }}>Last updated: 16 July 2026</p>

      <Section heading="1. Data Controller">
        <p>
          NiraNexus Ltd acts as the Data Controller for your personal data. We operate the NiraNexus-OS infrastructure — including the Model Council adversarial deliberation engine, Veritas professional deliberation interface, the NiraNexus Log, Telegram integration, and associated components — at niranexus.com and its subdomains.
        </p>
        <p style={{ marginTop: '0.5rem', color: '#94a3b8', fontSize: '0.85rem' }}>
          NiraNexus Ltd, Suite Ra01, 195–197 Wood Street, London, E17 3NU, United Kingdom. Registered in England and Wales, company number 17358183.
        </p>
      </Section>

      <Section heading="2. Data We Collect">
        <List items={[
          '<strong>Sign-in:</strong> When you authenticate via Google OAuth, we receive your email address and name from Google.',
          '<strong>Deliberations:</strong> When you submit a prompt for deliberation, we store the prompt, the model responses, and the synthesis verdict to support the Records panel and public evidence layer.',
          '<strong>Documents:</strong> When you upload a PDF for deliberation, we extract the text content in-memory and store it alongside your deliberation record in Supabase Storage. The original binary file is deleted after processing.',
          '<strong>Telegram:</strong> When you link a Telegram account, we store your Telegram chat identifier.',
          '<strong>Payments:</strong> Stripe processes all payments. We never receive or store your card number or payment details.',
        ]} />
      </Section>

      <Section heading="3. How We Use Your Data">
        <List items={[
          '<strong>Authentication:</strong> Your email verifies your identity and enforces quota limits on API requests.',
          '<strong>Deliberation history:</strong> Your deliberation records enable past deliberation recall in the Records panel and generate shareable public evidence URLs.',
          '<strong>Infrastructure security:</strong> Minimal analytics are processed to detect abuse and maintain infrastructure stability.',
          'We do not sell, share, or monetize your data with any third party beyond the infrastructure subprocessors listed in Section 4.',
        ]} />
      </Section>

      <Section heading="4. Infrastructure Subprocessors">
        These processors are required to operate the NiraNexus-OS pipeline:
        <List items={[
          '<strong>Supabase, Inc.</strong> — database, authentication, and Row Level Security',
          '<strong>Vercel, Inc.</strong> — hosting and edge function execution',
          '<strong>Stripe Payments Europe Ltd</strong> — payment processing',
          '<strong>OpenRouter (Miras Cloud LLC)</strong> — AI model API routing. Prompts submitted through the deliberation pipeline pass through OpenRouter to downstream model providers, selected dynamically based on availability and routing logic.',
          '<strong>Google LLC</strong> — OAuth 2.0 identity verification',
          '<strong>Telegram Messenger Inc.</strong> — bot integration (optional, user-initiated)',
        ]} />
        <p style={{ marginTop: '1rem' }}>
          Your prompts and generated outputs are processed via enterprise developer API pathways, including OpenRouter&rsquo;s zero-retention routes. We do not use your proprietary inputs or outputs to train, tune, or optimize internal models or third-party foundational models without your explicit, opt-in consent.
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          Each processor has entered into a Data Processing Agreement with NiraNexus Ltd. International data transfers are secured under Standard Contractual Clauses. DPAs are available upon request by contacting privacy@niranexus.com.
        </p>
      </Section>

      <Section heading="5. Cookies">
        <p>
          NiraNexus-OS uses two categories of cookies:
        </p>
        <List items={[
          '<strong>Essential authentication cookies:</strong> Supabase sets a session cookie when you sign in. This is strictly necessary to provide the deliberation service and does not require consent under UK PECR.',
          '<strong>Analytics cookie:</strong> Vercel sets a single privacy-focused analytics cookie (<code>_vercel_insights</code>) to measure infrastructure usage. This cookie does not track individuals, does not profile, and does not create cross-site records. It is only loaded after you provide consent via our cookie banner. You may withdraw consent at any time by clearing your browser storage for this site.',
        ]} />
        <p style={{ marginTop: '0.75rem' }}>
          We do not use advertising cookies, tracking cookies, or third-party marketing cookies. No cookie data is shared with advertisers, data brokers, or any party beyond the infrastructure subprocessors listed in Section 4.
        </p>
      </Section>

      <Section heading="6. Public Deliberation Records">
        Every deliberation produces a shareable public URL at model-council.niranexus.com/debate/[id]. By submitting a prompt, you acknowledge that the resulting deliberation record — including your prompt, extracted document text (if uploaded), model responses, and synthesis verdict — may be made publicly accessible through this evidence layer. The record does not display your email, name, or personal identifiers.
      </Section>

      <Section heading="7. Data Retention and Deletion">
        <p>
          Deliberation records are retained to support the public evidence layer and historical audit capability. Uploaded document text is retained for the same period as the deliberation record and deleted upon request.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          You may request deletion of your account and associated data via the deletion endpoint (authenticated users: POST /api/privacy/delete) or by emailing privacy@niranexus.com. Deletion cascades through Supabase to remove your profile, JWT metadata, prompt history, deliberation records, and uploaded document text.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          Payment records held by Stripe are retained for 6 years as required by HMRC and are not affected by account deletion. Public deliberation records are removed upon deletion.
        </p>
      </Section>

      <Section heading="8. Data Breach Notification">
        In the event of a personal data breach, we will notify the UK Information Commissioner&rsquo;s Office within 72 hours of becoming aware of the breach. Affected users will be notified without undue delay if the breach is likely to result in high risk to their rights and freedoms.
      </Section>

      <Section heading="9. Your Rights Under UK GDPR">
        You have the right to access, rectify, erase, restrict processing, and port your personal data. You have the right to object to processing based on legitimate interests. To exercise any of these rights, contact privacy@niranexus.com. We respond within 30 days. You may also lodge a complaint with the UK Information Commissioner&rsquo;s Office.
      </Section>

      <Section heading="10. Lawful Basis for Processing">
        <List items={[
          '<strong>Authenticated participants:</strong> contractual necessity — your email is required to provide the deliberation service and enforce quota limits.',
          '<strong>Visitors:</strong> legitimate interest — minimal analytics are processed for infrastructure security and abuse detection.',
        ]} />
      </Section>

      <Section heading="11. Age Restriction">
        NiraNexus-OS is not intended for individuals under the age of 18. We do not knowingly collect personal data from anyone under 18. If you believe a minor has provided us with personal data, contact privacy@niranexus.com and we will delete it immediately.
      </Section>

      <Section heading="12. Security">
        Row Level Security is enforced on every Supabase table. All database queries are scoped to the authenticated participant. JWT tokens are verified on every API request. Transport-layer encryption is applied throughout the infrastructure. Prompt content is stored in a hardened backend, not logged to third-party analytics.
      </Section>

      <Section heading="13. Changes to This Policy">
        We may update this Privacy Policy from time to time. Material changes will be communicated via email to registered participants and reflected in the &ldquo;Last updated&rdquo; date on this page.
      </Section>

      <Section heading="Contact">
        privacy@niranexus.com<br />
        support@niranexus.com
      </Section>

      <a
        href="#top"
        aria-label="Back to top"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '50%',
          backgroundColor: 'rgba(0, 235, 212, 0.12)',
          border: '1px solid rgba(0, 235, 212, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00ebd4',
          textDecoration: 'none',
          fontSize: '1.2rem',
          zIndex: 50,
          transition: 'background-color 0.2s',
        }}
        className="hover:underline"
      >
        ↑
      </a>
    </main>
    </>
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
