import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="text-7xl font-semibold tracking-tight">404</div>
      <p className="mt-4 text-[var(--color-text-muted)]">This page doesn't exist (yet).</p>
      <Link
        to="/"
        className="mt-8 inline-block px-6 py-3 rounded-full bg-[var(--color-accent)] text-black font-medium hover:bg-[var(--color-accent-hover)]"
      >
        Back to Careers
      </Link>
    </main>
  );
}
