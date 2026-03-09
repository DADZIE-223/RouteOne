import { requireAuth } from '@/lib/auth';
import { db } from '@/lib/mock-db';

export default function AdminPassengersPage() {
  requireAuth('ADMIN');
  const passengers = db.users.filter((u) => u.role === 'USER');
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Passengers</h2>
      {passengers.map((u) => <div key={u.id} className="card p-4">{u.fullName} · {u.email} · {u.phone}</div>)}
    </div>
  );
}
