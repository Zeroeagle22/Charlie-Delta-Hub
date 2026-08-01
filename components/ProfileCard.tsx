"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-white/20 shadow-lift"
      >
        <Image
          src="/profile.png"
          alt="Charlie Delta"
          fill
          className="object-cover scale-125"
          priority
        />
      </motion.div>

      <h1 className="mt-5 text-2xl font-semibold tracking-tight">
        Charlie Delta
      </h1>
      <p className="mt-1 text-sm text-white/60">
        Creator · Links & favorite things
      </p>
    </motion.div>
  );
}
