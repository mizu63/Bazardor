import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">404</h1>
        <p className="mt-2">এই পেজটি খুঁজে পাওয়া যায়নি।</p>
        <Link
      href="/"
      className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
    >
      ← হোম পেজে ফিরে যান
    </Link>
      </div>
    </main>
  );
}
