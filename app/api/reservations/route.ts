import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/mock-db';

export async function POST(req: Request) {
  const uid = cookies().get('routeone_user')?.value;
  if (!uid) return NextResponse.redirect(new URL('/login', req.url));
  const form = await req.formData();
  const routeId = String(form.get('routeId'));
  const seatNumber = Number(form.get('seatNumber'));
  const route = db.routes.find((r) => r.id === routeId);
  if (!route || seatNumber < 1 || seatNumber > route.capacity) return NextResponse.redirect(new URL('/dashboard', req.url));

  const existing = db.reservations.find((r) => r.userId === uid && r.status === 'RESERVED');
  if (existing) existing.seatNumber = seatNumber;
  else db.reservations.push({ id: randomUUID(), userId: uid, routeId, busId: route.busId || 'b1', seatNumber, reservationDate: new Date().toISOString(), status: 'RESERVED' });

  return NextResponse.redirect(new URL('/dashboard', req.url));
}
