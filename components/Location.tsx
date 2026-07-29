"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { weddingConfig } from "@/lib/wedding-config";

export function Location() {
  const { location } = weddingConfig;

  return (
    <section className="px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold-400">
            Мекенжай
          </p>

          <h2 className="font-serif text-3xl font-light text-wedding-text sm:text-4xl">
            Той өтетін орын
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-3xl border border-white/60 bg-white/50 p-8 text-center shadow-glass backdrop-blur-xl sm:p-10"
        >
          <MapPin className="mx-auto mb-4 h-6 w-6 text-gold-400" />

          <h3 className="font-serif text-2xl font-light text-wedding-text">
            {location.name}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-wedding-muted">
            {location.address}
          </p>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8"
          >
            <Button variant="gold" size="lg" className="w-full" asChild>
              <a
                href={location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation className="mr-2" />
                Картадан көру
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}