import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — NiraNexus',
  description: 'Terms governing the use of NiraNexus-OS infrastructure, including the Model Council adversarial deliberation engine.',
};

export default function TermsPage() {
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
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#ffffff', marginBottom: '0.5rem' }}>Terms of Service</h1>
      <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '2.5rem' }}>Last updated: 16 July 2026</p>

      <Section heading="1. Agreement">
        These terms govern your use of the NiraNexus-OS infrastructure operated by NiraNexus Ltd (&ldquo;NiraNexus,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;), a company registered in England and Wales. By accessing or using NiraNexus-OS — including the Model Council adversarial deliberation engine, the NiraNexus Log, Telegram bot integration, and all associated components — you agree to these terms.
      </Section>

      <Section heading="2. The Deliberation Pipeline">
        NiraNexus-OS is an adversarial deliberation pipeline. Four frontier models cross-examine each other across three rounds before producing a synthesis verdict. You submit a prompt. The Council deliberates. You receive a verdict with claims, confidence scores, dissent tracking, and an auditable Evidence Basis.
      </Section>

      <Section heading="3. AI Output Disclaimer">
        <p>
          Outputs are generated automatically via machine learning systems and third-party infrastructure including OpenRouter. Outputs are provided strictly &ldquo;as-is&rdquo; and &ldquo;as-available.&rdquo; NiraNexus makes no warranties regarding accuracy, reliability, or fitness for purpose.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          The platform routes deliberation requests through multiple model providers via OpenRouter. Different underlying models have different capabilities, safety characteristics, and failure modes. NiraNexus does not guarantee consistency of output quality or content filtering across model providers.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          You must independently verify and human-review all outputs before relying on them for any commercial, financial, legal, medical, or other consequential purpose. You acknowledge that AI systems are probabilistic and prone to hallucination; automated outputs must be verified by a human expert before reliance for critical decision-making. NiraNexus is not liable for decisions made based on AI-generated content.
        </p>
      </Section>

      <Section heading="4. Acceptable Use Policy">
        You agree not to:
        <List items={[
          'Generate or distribute content that violates Stripe&rsquo;s Prohibited and Restricted Business terms, including sexually explicit material, unconsented deepfakes, malicious code, political disinformation, or unverified medical or financial advice',
          'Attempt prompt injection attacks, jailbreaking of safety filters, or reverse-engineering of system prompts or model instructions',
          'Exploit variations in safety filtering across different underlying model providers to bypass platform guardrails',
          'Scrape, reverse-engineer, or access the platform via automated scripts or bots',
          'Submit prompts containing personal data of third parties without consent',
          'Attempt to bypass quota enforcement, rate limits, or authentication measures',
          'Exploit technical latency, race conditions, system bugs, or database sync delays to generate content beyond your authenticated balance',
        ]} />
        <p style={{ marginTop: '0.75rem' }}>
          Every prompt is processed through a unified moderation layer before reaching the model routing stage. Violations will result in account termination and forfeiture of all remaining capacity without refund.
        </p>
      </Section>

      <Section heading="5. Debates and Capacity">
        <p>
          The platform operates on a debate-based capacity model. Free access includes a limited number of deliberations. Additional capacity may be provisioned through Stripe.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          Capacity purchased on the platform constitutes a limited, non-transferable, revocable license to access computational infrastructure. Capacity has no cash or monetary value, cannot be redeemed for fiat currency, and strictly expires 12 months from the date of provisioning. Unused expired capacity is non-refundable.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          Capacity consumption varies based on model selection, prompt complexity, document attachments, and real-time infrastructure conditions. NiraNexus reserves the right to adjust consumption rates to reflect changing model provider costs without prior notice.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          Capacity deductions are enforced through atomic Postgres database functions with Row Level Security. Free capacity is consumed before purchased capacity. Exploiting latency or race conditions to deliberate beyond your authenticated balance constitutes a material breach resulting in immediate termination and forfeiture of all remaining capacity without refund.
        </p>
      </Section>

      <Section heading="6. Cancellation and Refunds">
        <p>
          Under the UK Consumer Contracts Regulations, you have a statutory 14-day right to cancel purchases of digital content. By provisioning capacity and initiating a deliberation, you expressly request immediate performance of this contract and acknowledge that you lose your statutory 14-day right to cancel once any deliberation has been executed.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          Refund requests for unconsumed capacity should be directed to payments@niranexus.com. Chargebacks filed after capacity has been consumed will be contested with authenticated usage logs showing deliberation activity, timestamps, and JWT-verified identity.
        </p>
      </Section>

      <Section heading="7. Intellectual Property">
        You retain ownership of the prompts you submit. You retain ownership of the synthesis verdicts generated from your prompts, subject to the AI output disclaimer above. NiraNexus retains all rights to the orchestration pipeline, model prompts, synthesis methodology, and underlying infrastructure code. NiraNexus does not claim ownership of the outputs of third-party AI models accessed through the platform.
      </Section>

      <Section heading="8. Liability">
        <p>
          To the maximum extent permitted by English law, NiraNexus Ltd&rsquo;s total liability for any claim arising out of these Terms or the use of the infrastructure shall be strictly limited to the lesser of &pound;100 or the total amount paid by you to NiraNexus in the 12 months preceding the claim.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          We are not liable for indirect, consequential, or incidental damages including lost profits, business interruption, or data loss. We are not liable for service interruptions, degraded performance, or unavailability caused by upstream infrastructure providers including OpenRouter rate limiting, downstream model provider outages, API key exhaustion, or model deprecation. NiraNexus is not responsible for the intellectual property compliance, content filtering consistency, or output quality of third-party model providers accessed through OpenRouter. These events do not entitle users to refunds, compensation, or damages.
        </p>
      </Section>

      <Section heading="9. Third-Party Platforms">
        The NiraNexus Telegram bot operates on Telegram Messenger Inc.&rsquo;s platform. Use of the bot is additionally subject to Telegram&rsquo;s Terms of Service and Privacy Policy. NiraNexus is not responsible for Telegram&rsquo;s platform availability, data handling, or content policies.
      </Section>

      <Section heading="10. Changes to These Terms">
        We may update these Terms from time to time. Material changes will be communicated via email to registered participants and reflected in the &ldquo;Last updated&rdquo; date on this page. Continued use of NiraNexus-OS after changes take effect constitutes acceptance of the updated Terms.
      </Section>

      <Section heading="11. Severability">
        If any provision of these Terms is found to be unenforceable or invalid by a court of competent jurisdiction, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
      </Section>

      <Section heading="12. Governing Law">
        These Terms, and any dispute arising from them, shall be governed exclusively by the laws of England and Wales. Both parties agree to submit to the exclusive jurisdiction of the courts of England and Wales.
      </Section>

      <Section heading="Contact">
        legal@niranexus.com<br />
        payments@niranexus.com<br />
        support@niranexus.com
        <p style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.8rem' }}>NiraNexus Ltd — Registered in England and Wales</p>
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
