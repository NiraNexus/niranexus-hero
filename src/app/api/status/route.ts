import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';

export async function GET() {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    );

    const { count, error } = await supabase
      .from('verdicts')
      .select('*', { count: 'exact', head: true })
      .not('claims', 'is', null);

    if (error) throw error;

    const { count: payingCount } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .gt('credits_remaining', 0);

    const uniqueUsers = count && count > 0 ? Math.max(1, Math.ceil(count / 5)) : 0;
    const conversionPct = uniqueUsers > 0 ? Math.round(((payingCount ?? 0) / uniqueUsers) * 100) : 0;

    return NextResponse.json({
      debates: count ?? 0,
      models: 4,
      status: 'HARDENED',
      uptime: 'live',
      conversionRate: conversionPct,
    });
  } catch {
    return NextResponse.json({
      debates: 0,
      models: 4,
      status: 'DEGRADED',
      uptime: 'offline',
    });
  }
}
