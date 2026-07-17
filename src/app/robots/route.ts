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
  const isTest = request.headers.get('host')?.startsWith('test.');
  const body = isTest ? TEST_RULES : PROD_RULES;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
