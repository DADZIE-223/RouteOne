import { requireAuth } from '@/lib/auth';
import { db } from '@/lib/mock-db';

export default function AdminBusesPage() {
  requireAuth('ADMIN');
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Manage Buses</h2>
      <form action="/api/admin/buses" method="post" className="card p-4 grid md:grid-cols-4 gap-2">
        <input className="border rounded p-2" name="plateNumber" placeholder="Plate" required />
        <input className="border rounded p-2" name="capacity" type="number" placeholder="Capacity" required />
        <select name="assignedRouteId" className="border rounded p-2">
          <option value="">Unassigned</option>
          {db.routes.map((r) => <option value={r.id} key={r.id}>{r.name}</option>)}
        </select>
        <button className="bg-navy text-white rounded p-2">Add bus</button>
      </form>
      {db.buses.map((b) => <div key={b.id} className="card p-4">{b.plateNumber} - {b.capacity} seats</div>)}
    </div>
  );
}
