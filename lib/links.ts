import {
  Youtube,
  Twitch,
  MessageSquare,
  Twitter,
  Instagram,
  Music2,
  HeartHandshake,
  Gamepad2,
  Zap,
  Cloud,
  Github,
  type LucideIcon,
} from "lucide-react";

export type Stat = { value: string; label: string };

export interface SocialLink {
  platform: string;
  handle: string;
  url: string;
  icon: LucideIcon;
  /** Optional stat. Swap in a real API later — see lib/api.ts */
  stat?: Stat;
  accent?: string; // brand accent color used subtly on hover
  /** Set to false to hide this link card */
  enabled?: boolean;
}

export const socialLinks: SocialLink[] = [
  {
    platform: "YouTube",
    handle: "@CharlieDelta",
    url: "https://www.youtube.com/@CharlieDelta",
    icon: Youtube,
    stat: { value: "84.2K", label: "Subscribers" },
    accent: "#ff0033",
  },
  {
    platform: "Twitch",
    handle: "CharlieDelta",
    url: "https://www.twitch.tv/CharlieDelta",
    icon: Twitch,
    stat: { value: "12.4K", label: "Followers" },
    accent: "#9146ff",
  },
  {
    platform: "Discord",
    handle: "Charlie Delta",
    url: "https://discord.gg/charliedelta",
    icon: MessageSquare,
    stat: { value: "6,210", label: "Members" },
    accent: "#5865f2",
  },
  {
    platform: "X",
    handle: "@CharlieDelta",
    url: "https://x.com/CharlieDelta",
    icon: Twitter,
    accent: "#1d9bf0",
    enabled: false,
  },
  {
    platform: "Instagram",
    handle: "@CharlieDelta",
    url: "https://www.instagram.com/CharlieDelta",
    icon: Instagram,
    accent: "#e1306c",
  },
  {
    platform: "TikTok",
    handle: "@CharlieDelta",
    url: "https://www.tiktok.com/@CharlieDelta",
    icon: Music2,
    accent: "#69c9d0",
  },
  {
    platform: "Patreon",
    handle: "Charlie Delta",
    url: "https://www.patreon.com/CharlieDelta",
    icon: HeartHandshake,
    accent: "#ff424d",
    enabled: false,
  },
  {
    platform: "Steam",
    handle: "CharlieDelta",
    url: "https://steamcommunity.com/id/CharlieDelta",
    icon: Gamepad2,
    accent: "#66c0f4",
    enabled: false,
  },
  {
    platform: "Kick",
    handle: "CharlieDelta",
    url: "https://kick.com/CharlieDelta",
    icon: Zap,
    accent: "#53fc18",
    enabled: false,
  },
  {
    platform: "Bluesky",
    handle: "@charliedelta.bsky.social",
    url: "https://bsky.app/profile/charliedelta.bsky.social",
    icon: Cloud,
    accent: "#0085ff",
    enabled: false,
  },
  {
    platform: "GitHub",
    handle: "CharlieDelta",
    url: "https://github.com/CharlieDelta",
    icon: Github,
    accent: "#a5b4fc",
  },
];
