'use client';

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export function OccupancyChart({ used, total }: { used: number; total: number }) {
  return (
    <div className="card p-4 h-64">
      <h3 className="font-semibold mb-2">Occupancy</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={[{ name: 'Route', used, available: total - used }]}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="used" fill="#0b1f3a" />
          <Bar dataKey="available" fill="#cbd5e1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
