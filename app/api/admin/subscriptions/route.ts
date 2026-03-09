import { NextResponse } from 'next/server';
import { db } from '@/lib/mock-db';

export async function POST(req: Request) {
  const form = await req.formData();
  const id = String(form.get('id'));
  const paymentStatus = String(form.get('paymentStatus')) as 'PAID' | 'UNPAID';
  const sub = db.subscriptions.find((s) => s.id === id);
  if (sub) sub.paymentStatus = paymentStatus;
  return NextResponse.redirect(new URL('/admin/subscriptions', req.url));
}
