"use client";

import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  rotation: number;
}

export function Petals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated: Petal[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 12,
      size: 8 + Math.random() * 12,
      opacity: 0.15 + Math.random() * 0.35,
      rotation: Math.random() * 360,
    }));
    setPetals(generated);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="petal absolute top-[-20px] block rounded-full"
          style={{
            left: `${petal.left}%`,
            width: petal.size,
            height: petal.size * 1.4,
            opacity: petal.opacity,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            transform: `rotate(${petal.rotation}deg)`,
            background:
              "linear-gradient(135deg, rgba(232, 213, 168, 0.8), rgba(196, 163, 90, 0.4))",
          }}
        />
      ))}
    </div>
  );
}
