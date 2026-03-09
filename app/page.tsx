import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="rounded-3xl bg-gradient-to-r from-navy to-slate-800 text-white p-10 md:p-14 shadow-xl">
        <p className="text-gold uppercase tracking-wide text-sm">Your Route. On Time.</p>
        <h1 className="text-4xl md:text-5xl font-bold mt-2 max-w-3xl">Subscription-based corporate shuttle for reliable, comfortable commuting</h1>
        <p className="mt-4 text-slate-200 max-w-2xl">RouteOne helps salaried professionals in Accra get to work predictably with fixed routes, guaranteed seats, and a premium commute experience.</p>
        <div className="mt-8 flex gap-3">
          <Link href="/routes" className="rounded-xl bg-gold px-5 py-3 text-navy font-semibold">Reserve Your Seat</Link>
          <Link href="/signup" className="rounded-xl border border-white/40 px-5 py-3">Create Account</Link>
        </div>
      </section>
    </div>
  );
}
