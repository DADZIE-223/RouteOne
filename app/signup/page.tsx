export default function SignupPage() {
  return (
    <form action="/api/auth/signup" method="post" className="card max-w-md p-6 space-y-3">
      <h2 className="text-2xl font-semibold">Sign up</h2>
      <input className="w-full border rounded-lg p-2" name="fullName" placeholder="Full name" required />
      <input className="w-full border rounded-lg p-2" name="email" placeholder="Email" type="email" required />
      <input className="w-full border rounded-lg p-2" name="phone" placeholder="Phone" required />
      <input className="w-full border rounded-lg p-2" name="password" placeholder="Password" type="password" minLength={6} required />
      <button className="w-full rounded-lg bg-navy text-white py-2">Create account</button>
    </form>
  );
}
