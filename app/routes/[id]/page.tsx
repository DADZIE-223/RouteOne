import { notFound } from 'next/navigation';
import { NotificationBanner } from '@/components/NotificationBanner';
import { db, seatsLeft } from '@/lib/mock-db';
import { getSessionUser } from '@/lib/auth';

export default function RouteDetailsPage({ params }: { params: { id: string } }) {
  const route = db.routes.find((r) => r.id === params.id);
  if (!route) notFound();
  const pickups = db.pickupPoints.filter((p) => p.routeId === route.id).sort((a, b) => a.sequenceOrder - b.sequenceOrder);
  const user = getSessionUser();

  return (
    <div className="space-y-4">
      <NotificationBanner routeId={route.id} />
      <div className="card p-6">
        <h2 className="text-2xl font-semibold">{route.name}</h2>
        <p className="text-slate-500">{route.origin} → {route.destination}</p>
        <div className="grid md:grid-cols-3 gap-4 mt-4 text-sm">
          <p><strong>Morning:</strong> {route.departureMorning}</p>
          <p><strong>Evening:</strong> {route.departureEvening}</p>
          <p><strong>Monthly:</strong> GHS {route.priceMonthly}</p>
        </div>
        <p className="mt-2 font-semibold">Seats left: {seatsLeft(route.id)}</p>
      </div>

      <div className="card p-6">
        <h3 className="font-semibold mb-3">Pickup points</h3>
        <ul className="space-y-2">
          {pickups.map((p) => <li key={p.id}>{p.sequenceOrder}. {p.name} ({p.estimatedTime})</li>)}
        </ul>
      </div>

      {user ? (
        <form className="card p-6 space-y-3" action="/api/subscriptions" method="post">
          <input type="hidden" name="routeId" value={route.id} />
          <label className="block text-sm">Pickup point
            <select name="pickupPointId" className="mt-1 w-full border rounded-lg p-2" required>
              {pickups.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </label>
          <button className="rounded-lg bg-navy text-white px-4 py-2">Subscribe (Mock Checkout)</button>
        </form>
      ) : <p>Please login to subscribe and reserve a seat.</p>}
    </div>
  );
}
