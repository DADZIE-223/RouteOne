import { NextResponse } from 'next/server';
import { db, seatsLeft } from '@/lib/mock-db';

export async function GET() {
  return NextResponse.json(db.routes.map((r) => ({ ...r, seatsLeft: seatsLeft(r.id) })));
}
