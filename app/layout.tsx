import './globals.css';
import Link from 'next/link';
import { getSessionUser } from '@/lib/auth';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const user = getSessionUser();
  return (
    <html lang="en">
      <body>
        <header className="bg-navy text-white">
          <div className="mx-auto max-w-6xl px-4 py-4 flex justify-between items-center">
            <Link href="/" className="font-semibold text-xl">RouteOne</Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/routes">Routes</Link>
              {user?.role === 'ADMIN' ? <Link href="/admin">Admin</Link> : <Link href="/dashboard">Dashboard</Link>}
              {user ? <form action="/api/auth/logout" method="post"><button>Logout</button></form> : <Link href="/login">Login</Link>}
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl p-4 md:p-6">{children}</main>
      </body>
    </html>
  );
}
