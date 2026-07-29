"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/lib/wedding-config";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream-100"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold-400">
              Үйлену тойы
            </p>
            <h1 className="font-serif text-4xl font-light text-wedding-text sm:text-5xl">
              {weddingConfig.groom.firstName}
              <span className="mx-3 text-gold-300">&</span>
              {weddingConfig.bride.firstName}
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mx-auto mt-8 h-px w-24 bg-gold-300"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
