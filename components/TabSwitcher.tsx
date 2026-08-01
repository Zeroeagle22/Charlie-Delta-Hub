"use client";

import { motion } from "framer-motion";

type Tab = "links" | "shop";

export default function TabSwitcher({
  active,
  onChange,
}: {
  active: Tab;
  onChange: (t: Tab) => void;
}) {
  const tabs: { id: Tab; label: string }[] = [
    { id: "links", label: "Links" },
    { id: "shop", label: "Shop" },
  ];

  return (
    <div className="mt-7 flex w-full max-w-xs rounded-full bg-white/10 p-1 backdrop-blur-md ring-1 ring-white/15">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className="relative flex-1 rounded-full py-2 text-sm font-semibold tracking-tight text-white/60 transition-colors"
          aria-pressed={active === t.id}
        >
          {active === t.id && (
            <motion.span
              layoutId="tab-pill"
              className="absolute inset-0 rounded-full bg-white"
              transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
            />
          )}
          <span className={`relative z-10 ${active === t.id ? "text-black" : "text-white/60"}`}>
            {t.label}
          </span>
        </button>
      ))}
    </div>
  );
}
