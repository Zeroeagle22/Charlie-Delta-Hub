"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/** Full-bleed blurred wallpaper backdrop. */
export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1.12 }}
        transition={{ duration: 24, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      >
        <Image
          src="/wallpaper.jpg"
          alt=""
          fill
          priority
          className="object-cover blur-md brightness-[0.65] saturate-[1.05]"
        />
      </motion.div>
      {/* soft vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
    </div>
  );
}
