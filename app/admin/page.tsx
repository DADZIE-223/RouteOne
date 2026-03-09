import { requireAuth } from '@/lib/auth';
import { db } from '@/lib/mock-db';
import { StatCard } from '@/components/StatCard';
import { OccupancyChart } from '@/components/OccupancyChart';

export default function AdminDashboard() {
  requireAuth('ADMIN');
  const activeSubs = db.subscriptions.filter((s) => s.status === 'ACTIVE' && s.paymentStatus === 'PAID');
  const totalSubscribers = activeSubs.length;
  const route = db.routes[0];
  const occupancy = route ? Math.round((totalSubscribers / route.capacity) * 100) : 0;
  const projectedRevenue = activeSubs.reduce((sum, s) => sum + (db.routes.find((r) => r.id === s.routeId)?.priceMonthly || 0), 0);

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-5 gap-3">
        <StatCard label="Total subscribers" value={totalSubscribers} />
        <StatCard label="Active routes" value={db.routes.filter((r) => r.status === 'ACTIVE').length} />
        <StatCard label="Buses assigned" value={db.buses.filter((b) => b.assignedRouteId).length} />
        <StatCard label="Occupancy rate" value={`${occupancy}%`} />
        <StatCard label="Projected monthly revenue" value={`GHS ${projectedRevenue}`} />
      </div>
      <OccupancyChart used={totalSubscribers} total={route.capacity} />
    </div>
  );
}
