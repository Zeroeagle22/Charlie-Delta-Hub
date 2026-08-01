"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { latestVideos } from "@/lib/latest-video";

export default function LatestVideosCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  // Duplicate items for seamless looping
  const items = [...latestVideos, ...latestVideos, ...latestVideos];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationId: number;
    let isAutoScrolling = false;
    let lastScrollTime = Date.now();

    // Start scrolled to the middle section so we can go both ways
    const cardWidth = 360 + 16;
    const middleStart = latestVideos.length * cardWidth;
    container.scrollLeft = middleStart;

    const checkScroll = () => {
      if (!isHovered && !isAutoScrolling) {
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        // If near end, jump back to middle seamlessly
        if (container.scrollLeft >= maxScroll - cardWidth * 2) {
          isAutoScrolling = true;
          container.scrollLeft = middleStart;
          setTimeout(() => { isAutoScrolling = false; }, 50);
        } 
        // If near start, jump forward to middle seamlessly
        else if (container.scrollLeft <= cardWidth * 2) {
          isAutoScrolling = true;
          container.scrollLeft = middleStart + latestVideos.length * cardWidth;
          setTimeout(() => { isAutoScrolling = false; }, 50);
        } 
        else {
          container.scrollBy({ left: 0.25, behavior: "auto" });
        }
      }
      animationId = requestAnimationFrame(checkScroll);
    };

    const handleScroll = () => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      setShowLeft(container.scrollLeft > 10);
      setShowRight(container.scrollLeft < maxScroll - 10);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    animationId = requestAnimationFrame(checkScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, [isHovered]);

  const scrollBy = (direction: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = 360 + 16;
    container.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mt-16 w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold tracking-tight">Latest Videos</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollBy(-1)}
            disabled={!showLeft}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white/60 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            disabled={!showRight}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white/60 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
        style={{ scrollBehavior: "auto" }}
      >
        {items.map((video, index) => (
          <motion.article
            key={`${video.id}-${index}`}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="shrink-0 w-[360px]"
          >
            <a
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 transition-all duration-300 hover:ring-white/20 hover:shadow-xl hover:shadow-black/30"
            >
              <div className="aspect-video relative">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="360px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-black transition-all duration-200 group-hover:bg-white"
                  >
                    <Play className="h-6 w-6 ml-1" />
                  </motion.div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-white line-clamp-2">{video.title}</p>
                <p className="mt-1 text-xs text-white/50">
                  {new Date(video.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>
            </a>
          </motion.article>
        ))}
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </motion.section>
  );
}