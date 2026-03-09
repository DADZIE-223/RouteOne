export default function LoginPage() {
  return (
    <form action="/api/auth/login" method="post" className="card max-w-md p-6 space-y-3">
      <h2 className="text-2xl font-semibold">Login</h2>
      <input className="w-full border rounded-lg p-2" name="email" placeholder="Email" type="email" required />
      <input className="w-full border rounded-lg p-2" name="password" placeholder="Password" type="password" required />
      <button className="w-full rounded-lg bg-navy text-white py-2">Sign in</button>
      <p className="text-xs text-slate-500">Demo admin: admin@routeone.co / admin123</p>
    </form>
  );
}
