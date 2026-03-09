import { NextResponse } from 'next/server';
import { db, seatsLeft } from '@/lib/mock-db';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const route = db.routes.find((r) => r.id === params.id);
  if (!route) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const pickupPoints = db.pickupPoints.filter((p) => p.routeId === route.id);
  return NextResponse.json({ ...route, pickupPoints, seatsLeft: seatsLeft(route.id) });
}
