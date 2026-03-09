import { NextResponse } from 'next/server';
import { addUser, db } from '@/lib/mock-db';

export async function POST(req: Request) {
  const form = await req.formData();
  const email = String(form.get('email'));
  if (db.users.some((u) => u.email === email)) return NextResponse.redirect(new URL('/signup', req.url));

  const user = addUser({
    fullName: String(form.get('fullName')),
    email,
    phone: String(form.get('phone')),
    password: String(form.get('password')),
    role: 'USER'
  });
  const res = NextResponse.redirect(new URL('/dashboard', req.url));
  res.cookies.set('routeone_user', user.id, { httpOnly: true, sameSite: 'lax', path: '/' });
  return res;
}
