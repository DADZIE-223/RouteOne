import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import { db } from '@/lib/mock-db';

export async function POST(req: Request) {
  const form = await req.formData();
  db.routes.push({
    id: randomUUID(),
    name: String(form.get('name')),
    origin: String(form.get('origin')),
    destination: String(form.get('destination')),
    priceMonthly: Number(form.get('priceMonthly')),
    departureMorning: String(form.get('departureMorning')),
    departureEvening: String(form.get('departureEvening')),
    capacity: Number(form.get('capacity')),
    status: 'ACTIVE'
  });
  return NextResponse.redirect(new URL('/admin/routes', req.url));
}
