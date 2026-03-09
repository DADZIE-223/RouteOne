import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { db } from './mock-db';

export function getSessionUser() {
  const uid = cookies().get('routeone_user')?.value;
  if (!uid) return null;
  return db.users.find((u) => u.id === uid) ?? null;
}

export function requireAuth(role?: 'ADMIN' | 'USER') {
  const user = getSessionUser();
  if (!user) redirect('/login');
  if (role && user.role !== role) redirect(user.role === 'ADMIN' ? '/admin' : '/dashboard');
  return user;
}
