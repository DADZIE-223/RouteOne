import { requireAuth } from '@/lib/auth';
import { db } from '@/lib/mock-db';

export default function DashboardPage() {
  const user = requireAuth('USER');
  const sub = db.subscriptions.find((s) => s.userId === user.id && s.status === 'ACTIVE');
  const route = sub ? db.routes.find((r) => r.id === sub.routeId) : null;
  const pickup = sub ? db.pickupPoints.find((p) => p.id === sub.pickupPointId) : null;
  const reservation = db.reservations.find((r) => r.userId === user.id && r.status === 'RESERVED');

  if (!sub || !route) return <div className="card p-6">No active subscription yet. Browse routes to reserve your seat.</div>;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="card p-5"><p className="text-sm text-slate-500">Subscribed route</p><p className="font-semibold">{route.name}</p></div>
      <div className="card p-5"><p className="text-sm text-slate-500">Subscription status</p><p className="font-semibold">{sub.status}</p></div>
      <div className="card p-5"><p className="text-sm text-slate-500">Seat status</p><p className="font-semibold">Seat {reservation?.seatNumber ?? 'Pending'}</p></div>
      <div className="card p-5"><p className="text-sm text-slate-500">Pickup point</p><p className="font-semibold">{pickup?.name}</p></div>
      <div className="card p-5"><p className="text-sm text-slate-500">Payment</p><p className="font-semibold">{sub.paymentStatus}</p></div>
      <div className="card p-5"><p className="text-sm text-slate-500">Next trip</p><p className="font-semibold">Tomorrow {route.departureMorning}</p></div>
      <form action="/api/reservations" method="post" className="card p-5 space-y-2 md:col-span-2">
        <h3 className="font-semibold">Reserve / update seat</h3>
        <input type="hidden" name="routeId" value={route.id} />
        <input className="border rounded-lg p-2" type="number" min={1} max={route.capacity} name="seatNumber" required />
        <button className="rounded-lg bg-navy text-white px-4 py-2">Reserve seat</button>
      </form>
    </div>
  );
}
