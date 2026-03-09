export type Role = 'USER' | 'ADMIN';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: Role;
  password: string;
  createdAt: string;
}

export interface Route {
  id: string;
  name: string;
  origin: string;
  destination: string;
  priceMonthly: number;
  departureMorning: string;
  departureEvening: string;
  capacity: number;
  status: 'ACTIVE' | 'PAUSED';
  busId?: string;
}

export interface PickupPoint {
  id: string;
  routeId: string;
  name: string;
  sequenceOrder: number;
  estimatedTime: string;
}

export interface Bus {
  id: string;
  plateNumber: string;
  capacity: number;
  status: 'ACTIVE' | 'MAINTENANCE';
  assignedRouteId?: string;
}

export interface Subscription {
  id: string;
  userId: string;
  routeId: string;
  pickupPointId: string;
  status: 'PENDING' | 'ACTIVE' | 'EXPIRED';
  paymentStatus: 'UNPAID' | 'PAID';
  startDate: string;
  endDate: string;
}

export interface Payment {
  id: string;
  userId: string;
  subscriptionId: string;
  amount: number;
  status: 'PENDING' | 'PAID';
  paymentMethod: 'MOCK' | 'MOMO' | 'PAYSTACK';
  paidAt?: string;
}

export interface Reservation {
  id: string;
  userId: string;
  routeId: string;
  busId: string;
  seatNumber: number;
  reservationDate: string;
  status: 'RESERVED' | 'CANCELLED';
}

export interface Notification {
  id: string;
  routeId: string;
  title: string;
  message: string;
  createdAt: string;
}
