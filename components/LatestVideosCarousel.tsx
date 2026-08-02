"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { LatestVideo } from "@/lib/latest-video";

const AUTOPLAY_DELAY_MS = 4000;
const IDLE_RESUME_MS = 2500;

interface LatestVideosCarouselProps {
  videos: LatestVideo[];
}

export default function LatestVideosCarousel({ videos }: LatestVideosCarouselProps) {
  const autoplayRef = useRef<ReturnType<typeof Autoplay> | null>(null);
  const [showLeft, setShowLeft] = useState(false);

  // The plugin instance must be stable across renders, so capture it in a ref.
  autoplayRef.current ??= Autoplay({
    delay: AUTOPLAY_DELAY_MS,
    stopOnInteraction: true,
    stopOnMouseEnter: true,
  });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: videos.length > 1, align: "start", containScroll: "trimSnaps" },
    [autoplayRef.current]
  );
  const [showRight, setShowRight] = useState(videos.length > 1);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!emblaApi) return;
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          emblaApi.scrollPrev();
          break;
        case "ArrowRight":
          e.preventDefault();
          emblaApi.scrollNext();
          break;
        case "Home":
          e.preventDefault();
          emblaApi.scrollTo(0);
          break;
        case "End":
          e.preventDefault();
          emblaApi.scrollTo(emblaApi.scrollSnapList().length - 1);
          break;
      }
    },
    [emblaApi]
  );

  const scrollBy = useCallback(
    (dir: number) => {
      if (!emblaApi) return;
      if (dir < 0) emblaApi.scrollPrev();
      else emblaApi.scrollNext();
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setShowLeft(emblaApi.canScrollPrev());
      setShowRight(emblaApi.canScrollNext());
    };
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  // Resume autoplay after a short idle window following any interaction.
  useEffect(() => {
    if (!emblaApi) return;
    const root = emblaApi.rootNode();
    let timer: ReturnType<typeof setTimeout> | undefined;

    const scheduleResume = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        if (autoplayRef.current && !autoplayRef.current.isPlaying()) {
          autoplayRef.current.play();
        }
      }, IDLE_RESUME_MS);
    };

    if (root) {
      root.addEventListener("pointerdown", scheduleResume);
      root.addEventListener("mouseenter", scheduleResume);
      root.addEventListener("mouseleave", scheduleResume);
      root.addEventListener("focusin", scheduleResume);
      root.addEventListener("touchstart", scheduleResume);
    }
    emblaApi.on("pointerUp", scheduleResume);
    emblaApi.on("settle", scheduleResume);

    return () => {
      if (timer) clearTimeout(timer);
      if (root) {
        root.removeEventListener("pointerdown", scheduleResume);
        root.removeEventListener("mouseenter", scheduleResume);
        root.removeEventListener("mouseleave", scheduleResume);
        root.removeEventListener("focusin", scheduleResume);
        root.removeEventListener("touchstart", scheduleResume);
      }
      emblaApi.off("pointerUp", scheduleResume);
      emblaApi.off("settle", scheduleResume);
    };
  }, [emblaApi]);

  if (videos.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mt-16 w-full"
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
        ref={emblaRef}
        className="overflow-hidden"
        aria-roledescription="carousel"
        aria-label="Latest videos"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div className="flex gap-4">
          {videos.map((video) => (
            <motion.article
              key={video.id}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="shrink-0 w-[360px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/40"
              aria-roledescription="slide"
              aria-label={video.title}
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
      </div>
    </motion.section>
  );
}