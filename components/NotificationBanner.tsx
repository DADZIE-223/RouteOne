import { db } from '@/lib/mock-db';

export function NotificationBanner({ routeId }: { routeId: string }) {
  const notice = db.notifications.find((n) => n.routeId === routeId);
  if (!notice) return null;
  return (
    <div className="mb-4 rounded-xl border border-gold/30 bg-amber-50 p-3 text-sm">
      <strong>{notice.title}:</strong> {notice.message}
    </div>
  );
}
