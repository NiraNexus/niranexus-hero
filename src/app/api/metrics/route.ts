import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

let _cached: { data: Record<string, number>; ts: number } | null = null;

export async function GET() {
  // Return cached data within 60s window
  if (_cached && Date.now() - _cached.ts < 60_000) {
    return NextResponse.json(_cached.data, {
      headers: { 'Cache-Control': 'public, max-age=60' },
    });
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const today = new Date().toISOString().split('T')[0];

    const [totalRes, usersRes, todayRes, payingRes] = await Promise.all([
      supabase.from('verdicts').select('debate_id', { count: 'exact', head: true }).not('claims', 'is', null),
      supabase.from('verdicts').select('debate_id').not('claims', 'is', null),
      supabase.from('verdicts').select('debate_id', { count: 'exact', head: true }).not('claims', 'is', null).gte('created_at', today),
      supabase.from('profiles').select('user_id', { count: 'exact', head: true }).gt('credits_remaining', 0),
    ]);

    const debatesTotal = totalRes.count ?? 0;
    // Get unique users from valid verdicts by fetching debate user_ids
    const { data: debateUsers } = await supabase
      .from('debates')
      .select('user_id')
      .in('id', (usersRes.data || []).map((v: any) => v.debate_id))
      .neq('user_id', null);
    const uniqueUsers = new Set((debateUsers || []).map((d: any) => d.user_id)).size;
    const debatesToday = todayRes.count ?? 0;
    const totalUsers = uniqueUsers || 1; // avoid division by zero
    const payingUsers = payingRes.count ?? 0;
    const conversionRate = totalUsers > 0 ? Math.round((payingUsers / totalUsers) * 100) : 0;

    const data = { debatesTotal, uniqueUsers: totalUsers, debatesToday, conversionRate };

    _cached = { data, ts: Date.now() };

    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, max-age=60' },
    });
  } catch {
    return NextResponse.json(
      { debatesTotal: 0, uniqueUsers: 0, debatesToday: 0, conversionRate: 0 },
      { status: 200 },
    );
  }
}
