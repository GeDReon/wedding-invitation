"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/lib/wedding-config";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: string): TimeLeft {
  const difference = new Date(targetDate).getTime() - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="flex min-w-[72px] flex-col items-center rounded-2xl border border-white/50 bg-white/40 px-4 py-5 shadow-glass backdrop-blur-xl sm:min-w-[88px] sm:px-6 sm:py-6"
    >
      <span className="font-serif text-3xl font-light tabular-nums text-wedding-text sm:text-4xl">
        {String(value).padStart(2, "0")}
      </span>

      <span className="mt-2 text-[10px] uppercase tracking-[0.2em] text-wedding-muted sm:text-xs">
        {label}
      </span>
    </motion.div>
  );
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(weddingConfig.date.iso)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(weddingConfig.date.iso));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold-400">
            Тойымызға дейін
          </p>

          <h2 className="font-serif text-3xl font-light text-wedding-text sm:text-4xl">
            Қалған уақыт
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4"
        >
          <TimeBlock value={timeLeft.days} label="Күн" />
          <TimeBlock value={timeLeft.hours} label="Сағат" />
          <TimeBlock value={timeLeft.minutes} label="Минут" />
          <TimeBlock value={timeLeft.seconds} label="Секунд" />
        </motion.div>
      </div>
    </section>
  );
}