"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { weddingConfig } from "@/lib/wedding-config";

export function Parents() {
  const { hosts } = weddingConfig;

  return (
    <section className="px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold-400">
            Той иелері
          </p>

          <h2 className="font-serif text-3xl font-light text-wedding-text sm:text-4xl">
            Ата-ананың ақ батасымен
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="rounded-3xl border border-white/60 bg-white/40 p-8 text-center shadow-glass backdrop-blur-xl transition-shadow hover:shadow-elevated"
          >
            <Heart className="mx-auto mb-4 h-5 w-5 text-gold-400" />

            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-wedding-muted">
              Ата-әжесі
            </p>

            <p className="font-serif text-xl text-wedding-text">
              {hosts.grandparents}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="rounded-3xl border border-white/60 bg-white/40 p-8 text-center shadow-glass backdrop-blur-xl transition-shadow hover:shadow-elevated"
          >
            <Heart className="mx-auto mb-4 h-5 w-5 text-gold-400" />

            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-wedding-muted">
              Ата-анасы
            </p>

            <p className="font-serif text-xl text-wedding-text">
              {hosts.parents}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}