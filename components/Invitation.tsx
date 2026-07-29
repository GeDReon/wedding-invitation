"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/lib/wedding-config";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export function Invitation() {
  return (
    <section id="invitation" className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          variants={fadeUp}
          className="text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold-400">
            Шақыру
          </p>

          <h2 className="mb-10 font-serif text-4xl font-light text-wedding-text sm:text-5xl">
            Біз шаңырақ көтереміз
          </h2>

          <div className="mx-auto mb-10 h-px w-12 bg-gold-300" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          variants={fadeUp}
          className="rounded-3xl border border-white/60 bg-white/50 p-8 shadow-glass backdrop-blur-xl sm:p-12"
        >
          <p className="whitespace-pre-line text-center font-serif text-lg leading-[1.9] text-wedding-text/90 sm:text-xl">
            {weddingConfig.invitation.text}
          </p>
        </motion.div>
      </div>
    </section>
  );
}