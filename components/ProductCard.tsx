"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Product } from "@/lib/products";

export default function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  return (
    <motion.a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.06 * index, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      className="group overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/15 transition-all duration-200 hover:bg-white/15 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/5">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading={index < 2 ? "eager" : "lazy"}
        />
      </div>
      <div className="flex items-center justify-between p-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight">{product.name}</p>
          {product.price && <p className="text-xs text-white/60">{product.price}</p>}
        </div>
        <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/85 ring-1 ring-white/20 transition-colors group-hover:bg-white/20">
          View
        </span>
      </div>
    </motion.a>
  );
}
