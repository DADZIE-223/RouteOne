import Link from 'next/link';
import { db, seatsLeft } from '@/lib/mock-db';

export default function RoutesPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Available Routes</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {db.routes.map((route) => (
          <div key={route.id} className="card p-5">
            <h3 className="font-semibold text-lg">{route.name}</h3>
            <p className="text-sm text-slate-500">{route.origin} to {route.destination}</p>
            <p className="mt-2">GHS {route.priceMonthly}/month</p>
            <p className="text-sm mt-1">Seats left: <span className="font-semibold">{seatsLeft(route.id)}</span></p>
            <Link className="inline-block mt-4 text-navy font-semibold" href={`/routes/${route.id}`}>View route →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
