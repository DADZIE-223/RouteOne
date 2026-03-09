import { NextResponse } from 'next/server';
import { db } from '@/lib/mock-db';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const rows = db.subscriptions
    .filter((s) => s.routeId === params.id && s.status === 'ACTIVE')
    .map((s) => {
      const u = db.users.find((user) => user.id === s.userId);
      return `${u?.fullName || ''},${u?.email || ''},${u?.phone || ''},${s.paymentStatus}`;
    });
  const csv = ['name,email,phone,payment_status', ...rows].join('\n');
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="route-${params.id}-passengers.csv"`
    }
  });
}
