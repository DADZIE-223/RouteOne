# RouteOne MVP

RouteOne is a premium corporate shuttle subscription MVP for Accra commuters.

## Stack
- Next.js 14 + TypeScript + Tailwind CSS
- Next.js API routes backend
- Prisma schema for PostgreSQL data modeling
- Mock payment flow (ready for MoMo/Paystack adapter)

## Run locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start app:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000`

## Demo accounts
- User: `ama@routeone.co` / `password123`
- Admin: `admin@routeone.co` / `admin123`

## Included screens
- `/` landing
- `/routes`
- `/routes/[id]`
- `/login`
- `/signup`
- `/dashboard`
- `/admin`
- `/admin/routes`
- `/admin/buses`
- `/admin/passengers`
- `/admin/subscriptions`

## Business logic implemented
- Dynamic seats left
- Prevent duplicate active subscriptions per user+route
- Block subscription when route is full
- Manual payment approval workflow in admin subscriptions
- Projected revenue and occupancy in admin dashboard

## Database
- Production schema in `prisma/schema.prisma` for PostgreSQL
- MVP in-memory seed + mock DB in `lib/mock-db.ts`

## Extensibility
- Add real auth provider by replacing cookie-based handlers in `app/api/auth/*`
- Add payment providers by extending `payments` API service layer
- Add multi-route operations by moving `lib/mock-db.ts` to persistent DB service
