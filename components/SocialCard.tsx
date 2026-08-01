"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { SocialLink } from "@/lib/links";

export default function SocialCard({
  link,
  index,
}: {
  link: SocialLink;
  index: number;
}) {
  const Icon = link.icon;

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.06 * index, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="group flex items-center gap-4 rounded-2xl bg-white/10 px-4 py-4 backdrop-blur-md ring-1 ring-white/15 transition-all duration-200 hover:bg-white/15 hover:shadow-lift"
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20"
        style={{ color: link.accent }}
      >
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-semibold tracking-tight">{link.platform}</p>
        <p className="truncate text-xs text-white/60">{link.handle}</p>
        {link.stat && (
          <p className="mt-0.5 text-xs text-white/60">
            <span className="font-medium text-white/85">{link.stat.value}</span>{" "}
            {link.stat.label}
          </p>
        )}
      </div>

      <ArrowUpRight className="h-4 w-4 shrink-0 text-white/50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
    </motion.a>
  );
}
