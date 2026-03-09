import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import { db } from '@/lib/mock-db';

export async function POST(req: Request) {
  const form = await req.formData();
  db.pickupPoints.push({
    id: randomUUID(),
    routeId: String(form.get('routeId')),
    name: String(form.get('name')),
    sequenceOrder: Number(form.get('sequenceOrder')),
    estimatedTime: String(form.get('estimatedTime'))
  });
  return NextResponse.redirect(new URL('/admin/routes', req.url));
}
