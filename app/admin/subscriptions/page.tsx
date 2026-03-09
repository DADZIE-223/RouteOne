import { requireAuth } from '@/lib/auth';
import { db } from '@/lib/mock-db';

export default function AdminSubscriptionsPage() {
  requireAuth('ADMIN');
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Subscriptions</h2>
      {db.subscriptions.map((s) => (
        <form key={s.id} action="/api/admin/subscriptions" method="post" className="card p-4 flex flex-wrap items-center gap-3">
          <input type="hidden" name="id" value={s.id} />
          <span>Subscription {s.id} · {s.status} · Payment: {s.paymentStatus}</span>
          <select className="border rounded p-2" name="paymentStatus" defaultValue={s.paymentStatus}>
            <option value="UNPAID">UNPAID</option>
            <option value="PAID">PAID</option>
          </select>
          <button className="bg-navy text-white rounded px-3 py-2">Update</button>
        </form>
      ))}
    </div>
  );
}
