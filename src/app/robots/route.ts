import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const PROD_RULES = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://niranexus.com/sitemap.xml
`;

const TEST_RULES = `User-agent: *
Disallow: /
`;

export function GET(request: NextRequest): Response {
  const isTest = request.nextUrl.hostname.startsWith('test.') || request.nextUrl.hostname.includes('rmnrsb');
  const body = isTest ? TEST_RULES : PROD_RULES;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
