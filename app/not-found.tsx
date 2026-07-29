import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold-400">
        404
      </p>
      <h1 className="mb-4 font-serif text-5xl font-light text-wedding-text">
        Бет табылмады
      </h1>
      <p className="mb-8 max-w-md text-wedding-muted">
        Сіз адасып кеткен сияқтысыз. Шақыру бетіне оралыңыз.
      </p>
      <Button variant="gold" asChild>
        <Link href="/">Басты бетке</Link>
      </Button>
    </div>
  );
}
