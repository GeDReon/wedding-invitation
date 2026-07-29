"use client";

import { weddingConfig } from "@/lib/wedding-config";

export function Footer() {
  const year = new Date().getFullYear();
  const { groom, bride } = weddingConfig;

  return (
    <footer className="border-t border-beige-200/50 px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-serif text-2xl font-light text-wedding-text">
          {groom.firstName} & {bride.firstName}
        </p>
        <div className="mx-auto my-4 h-px w-8 bg-gold-300" />
        <p className="text-sm text-wedding-muted">
          {weddingConfig.date.display} · {weddingConfig.date.time}
        </p>
        <p className="mt-8 text-xs tracking-wide text-wedding-muted/70">
          © {year} Біздің ерекше күнімізге сүйіспеншілікпен жасалды
        </p>
      </div>
    </footer>
  );
}
