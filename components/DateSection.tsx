"use client";

import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { weddingConfig } from "@/lib/wedding-config";

export function DateSection() {
  const { date } = weddingConfig;

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
            Той күні
          </p>

          <h2 className="font-serif text-3xl font-light text-wedding-text sm:text-4xl">
            Біздің ерекше күніміз
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          whileHover={{ scale: 1.02 }}
          className="rounded-3xl border border-white/60 bg-white/50 p-10 text-center shadow-glass backdrop-blur-xl"
        >
          <p className="mb-2 text-xs uppercase tracking-[0.25em] text-gold-400">
            {date.dayOfWeek}
          </p>

          <p className="font-serif text-3xl font-light text-wedding-text sm:text-4xl">
            {date.display}
          </p>

          <div className="mx-auto my-6 h-px w-12 bg-gold-200" />

          <div className="flex items-center justify-center gap-6 text-wedding-muted">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gold-400" />
              <span className="text-sm">{date.dayOfWeek}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gold-400" />
              <span className="text-sm">{date.time}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}