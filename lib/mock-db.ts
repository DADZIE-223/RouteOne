import { randomUUID } from 'crypto';
import { Bus, Notification, Payment, PickupPoint, Reservation, Route, Subscription, User } from './types';

const now = new Date().toISOString();

export const db = {
  users: [
    { id: 'u1', fullName: 'Ama Mensah', email: 'ama@routeone.co', phone: '0241000001', role: 'USER', password: 'password123', createdAt: now },
    { id: 'u2', fullName: 'Kojo Asare', email: 'kojo@routeone.co', phone: '0241000002', role: 'USER', password: 'password123', createdAt: now },
    { id: 'a1', fullName: 'RouteOne Admin', email: 'admin@routeone.co', phone: '0241000000', role: 'ADMIN', password: 'admin123', createdAt: now }
  ] as User[],
  routes: [
    {
      id: 'r1',
      name: 'Kasoa → Atomic/Madina',
      origin: 'Kasoa',
      destination: 'Atomic/Madina',
      priceMonthly: 850,
      departureMorning: '05:45',
      departureEvening: '17:30',
      capacity: 29,
      status: 'ACTIVE',
      busId: 'b1'
    }
  ] as Route[],
  pickupPoints: [
    { id: 'p1', routeId: 'r1', name: 'Kasoa Overhead', sequenceOrder: 1, estimatedTime: '05:45' },
    { id: 'p2', routeId: 'r1', name: 'Mallam Junction', sequenceOrder: 2, estimatedTime: '06:05' },
    { id: 'p3', routeId: 'r1', name: 'Kaneshie First Light', sequenceOrder: 3, estimatedTime: '06:20' },
    { id: 'p4', routeId: 'r1', name: '37 Military Hospital', sequenceOrder: 4, estimatedTime: '06:35' },
    { id: 'p5', routeId: 'r1', name: 'Atomic Junction', sequenceOrder: 5, estimatedTime: '06:55' },
    { id: 'p6', routeId: 'r1', name: 'Madina Zongo Junction', sequenceOrder: 6, estimatedTime: '07:10' }
  ] as PickupPoint[],
  buses: [{ id: 'b1', plateNumber: 'GT-4321-24', capacity: 29, status: 'ACTIVE', assignedRouteId: 'r1' }] as Bus[],
  subscriptions: [
    { id: 's1', userId: 'u1', routeId: 'r1', pickupPointId: 'p2', status: 'ACTIVE', paymentStatus: 'PAID', startDate: '2026-01-01', endDate: '2026-01-31' },
    { id: 's2', userId: 'u2', routeId: 'r1', pickupPointId: 'p4', status: 'ACTIVE', paymentStatus: 'PAID', startDate: '2026-01-01', endDate: '2026-01-31' }
  ] as Subscription[],
  payments: [
    { id: 'pay1', userId: 'u1', subscriptionId: 's1', amount: 850, status: 'PAID', paymentMethod: 'MOCK', paidAt: now },
    { id: 'pay2', userId: 'u2', subscriptionId: 's2', amount: 850, status: 'PAID', paymentMethod: 'MOCK', paidAt: now }
  ] as Payment[],
  reservations: [
    { id: 'res1', userId: 'u1', routeId: 'r1', busId: 'b1', seatNumber: 4, reservationDate: now, status: 'RESERVED' },
    { id: 'res2', userId: 'u2', routeId: 'r1', busId: 'b1', seatNumber: 7, reservationDate: now, status: 'RESERVED' }
  ] as Reservation[],
  notifications: [
    { id: 'n1', routeId: 'r1', title: 'Morning departure update', message: 'Monday shuttle leaves 10 minutes earlier due to roadworks.', createdAt: now }
  ] as Notification[]
};

export function seatsLeft(routeId: string) {
  const route = db.routes.find((r) => r.id === routeId);
  if (!route) return 0;
  const used = db.subscriptions.filter((s) => s.routeId === routeId && s.status === 'ACTIVE' && s.paymentStatus === 'PAID').length;
  return route.capacity - used;
}

export function addUser(payload: Omit<User, 'id' | 'createdAt'>) {
  const user: User = { ...payload, id: randomUUID(), createdAt: new Date().toISOString() };
  db.users.push(user);
  return user;
}
