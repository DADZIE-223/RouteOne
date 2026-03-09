import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import { db } from '@/lib/mock-db';

export async function POST(req: Request) {
  const form = await req.formData();
  const assignedRouteId = String(form.get('assignedRouteId') || '');
  db.buses.push({
    id: randomUUID(),
    plateNumber: String(form.get('plateNumber')),
    capacity: Number(form.get('capacity')),
    status: 'ACTIVE',
    assignedRouteId: assignedRouteId || undefined
  });
  return NextResponse.redirect(new URL('/admin/buses', req.url));
}
