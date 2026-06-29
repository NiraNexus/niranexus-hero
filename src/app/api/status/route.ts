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
      .from('debates')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;

    return NextResponse.json({
      debates: count ?? 0,
      models: 4,
      status: 'HARDENED',
      uptime: 'live',
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
