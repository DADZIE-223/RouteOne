import Link from 'next/link';
import { requireAuth } from '@/lib/auth';
import { db, seatsLeft } from '@/lib/mock-db';

export default function AdminRoutesPage() {
  requireAuth('ADMIN');
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Manage Routes</h2>
      <form action="/api/admin/routes" method="post" className="card p-4 grid md:grid-cols-4 gap-2">
        <input className="border rounded p-2" name="name" placeholder="Route name" required />
        <input className="border rounded p-2" name="origin" placeholder="Origin" required />
        <input className="border rounded p-2" name="destination" placeholder="Destination" required />
        <input className="border rounded p-2" name="priceMonthly" type="number" placeholder="Price" required />
        <input className="border rounded p-2" name="departureMorning" placeholder="Morning time" required />
        <input className="border rounded p-2" name="departureEvening" placeholder="Evening time" required />
        <input className="border rounded p-2" name="capacity" type="number" placeholder="Capacity" required />
        <button className="bg-navy text-white rounded p-2">Create route</button>
      </form>

      <form action="/api/admin/pickup-points" method="post" className="card p-4 grid md:grid-cols-5 gap-2">
        <select name="routeId" className="border rounded p-2" required>{db.routes.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}</select>
        <input className="border rounded p-2" name="name" placeholder="Pickup point" required />
        <input className="border rounded p-2" name="sequenceOrder" type="number" placeholder="Order" required />
        <input className="border rounded p-2" name="estimatedTime" placeholder="ETA (HH:mm)" required />
        <button className="bg-navy text-white rounded p-2">Add pickup point</button>
      </form>

      <div className="space-y-2">
        {db.routes.map((r) => (
          <div className="card p-4" key={r.id}>
            <p className="font-semibold">{r.name}</p>
            <p className="text-sm">Capacity: {r.capacity} | Occupancy: {r.capacity - seatsLeft(r.id)}/{r.capacity}</p>
            <Link className="text-sm text-navy font-semibold" href={`/api/admin/routes/${r.id}/export`}>Export passenger list</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
