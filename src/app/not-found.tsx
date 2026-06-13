import Link from 'next/link';
import { TOOLS } from '@/lib/site';

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-6xl font-bold text-brand-300">404</p>
      <h1 className="mt-2 text-2xl font-bold">Page not found</h1>
      <p className="mt-2 max-w-md text-brand-500">The page you’re looking for doesn’t exist. Try one of our tools instead.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {TOOLS.filter((t) => t.featured).slice(0, 4).map((t) => (
          <Link key={t.slug} href={`/${t.slug}`} className="btn-ghost">
            {t.icon} {t.title}
          </Link>
        ))}
      </div>
      <Link href="/" className="btn-primary mt-4">Back home</Link>
    </div>
  );
}
