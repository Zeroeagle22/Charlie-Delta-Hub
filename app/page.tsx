"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedBackground from "@/components/AnimatedBackground";
import ProfileCard from "@/components/ProfileCard";
import TabSwitcher from "@/components/TabSwitcher";
import SocialCard from "@/components/SocialCard";
import ProductCard from "@/components/ProductCard";
import LatestVideosCarousel from "@/components/LatestVideosCarousel";
import Footer from "@/components/Footer";
import { socialLinks } from "@/lib/links";
import { products } from "@/lib/products";

export default function Page() {
  const [tab, setTab] = useState<"links" | "shop">("links");

  return (
    <>
      <AnimatedBackground />

      <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center px-5 py-14">
        <ProfileCard />

        <TabSwitcher active={tab} onChange={setTab} />

        <AnimatePresence mode="wait">
          <motion.section
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mt-8 w-full"
          >
            {tab === "links" ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {socialLinks.filter(l => l.enabled !== false).map((l, i) => (
                  <SocialCard key={l.platform} link={l} index={i} />
                ))}
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {products.map((p, i) => (
                  <ProductCard key={p.name} product={p} index={i} />
                ))}
              </div>
            )}
          </motion.section>
        </AnimatePresence>

        <LatestVideosCarousel />

        <Footer />
      </main>
    </>
  );
}
