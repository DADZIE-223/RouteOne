import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db, seatsLeft } from '@/lib/mock-db';

export async function POST(req: Request) {
  const uid = cookies().get('routeone_user')?.value;
  if (!uid) return NextResponse.redirect(new URL('/login', req.url));
  const form = await req.formData();
  const routeId = String(form.get('routeId'));
  const pickupPointId = String(form.get('pickupPointId'));

  const existing = db.subscriptions.find((s) => s.userId === uid && s.routeId === routeId && s.status === 'ACTIVE');
  if (existing) return NextResponse.redirect(new URL(`/routes/${routeId}`, req.url));
  if (seatsLeft(routeId) <= 0) return NextResponse.redirect(new URL(`/routes/${routeId}`, req.url));

  const subId = randomUUID();
  db.subscriptions.push({
    id: subId,
    userId: uid,
    routeId,
    pickupPointId,
    status: 'ACTIVE',
    paymentStatus: 'PAID',
    startDate: new Date().toISOString().slice(0, 10),
    endDate: '2026-12-31'
  });
  db.payments.push({ id: randomUUID(), userId: uid, subscriptionId: subId, amount: db.routes.find((r) => r.id === routeId)?.priceMonthly || 0, status: 'PAID', paymentMethod: 'MOCK', paidAt: new Date().toISOString() });

  return NextResponse.redirect(new URL('/dashboard', req.url));
}
