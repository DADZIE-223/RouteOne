import { NextResponse } from 'next/server';
import { db } from '@/lib/mock-db';

export async function POST(req: Request) {
  const form = await req.formData();
  const email = String(form.get('email'));
  const password = String(form.get('password'));
  const user = db.users.find((u) => u.email === email && u.password === password);
  if (!user) return NextResponse.redirect(new URL('/login', req.url));

  const to = user.role === 'ADMIN' ? '/admin' : '/dashboard';
  const res = NextResponse.redirect(new URL(to, req.url));
  res.cookies.set('routeone_user', user.id, { httpOnly: true, sameSite: 'lax', path: '/' });
  return res;
}
