"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { weddingConfig } from "@/lib/wedding-config";

export function Hero() {
  const scrollToInvitation = () => {
    document
      .getElementById("invitation")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-end overflow-hidden">

      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={weddingConfig.hero.image}
          alt="Бекжан & Гүлзада"
          fill
          priority
          className="object-cover object-[center_15%]"
          sizes="100vw"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-cream-100/95" />
      </div>


      {/* Content */}
      <div className="relative z-10 flex w-full max-w-lg flex-col items-center px-5 pb-12 pt-24 text-center">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 text-xs uppercase tracking-[0.35em] text-white/90"
        >
          ҮЙЛЕНУ ТОЙЫНА ШАҚЫРУ
        </motion.p>


        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-5xl font-light leading-tight text-white"
        >
          {weddingConfig.groom.firstName}

          <span className="mx-3 text-gold-200">
            &
          </span>

          {weddingConfig.bride.firstName}
        </motion.h1>


        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="my-6 h-px w-16 bg-gold-200/80"
        />


        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-sm text-base leading-relaxed text-white/90"
        >
          {weddingConfig.hero.subtitle}
        </motion.p>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8"
        >
          <Button
            variant="glass"
            size="lg"
            onClick={scrollToInvitation}
            className="border-white/30 bg-white/20 px-8 text-white hover:bg-white/30"
          >
            Шақыруды ашу
            <ChevronDown className="ml-2 animate-bounce" />
          </Button>
        </motion.div>


      </div>

    </section>
  );
}