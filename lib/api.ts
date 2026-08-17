import type { LatestVideo } from "./latest-video";

export interface YouTubeStats {
  title: string;
  avatarUrl: string;
  subscriberCount: string;
  rawSubscribers: number;
}

export interface TwitchStats {
  followerCount: number;
  followersLabel: string;
}

export function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

async function ytCached<T>(url: string, revalidate: number): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchYouTubeStats(): Promise<YouTubeStats | null> {
  const key = process.env.YOUTUBE_API_KEY;
  const id = process.env.YOUTUBE_CHANNEL_ID;
  if (!key || !id) return null;
  const data = await ytCached<any>(
    `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${id}&key=${key}`,
    3600,
  );
  const ch = data?.items?.[0];
  if (!ch) return null;
  const raw = Number(ch.statistics.subscriberCount);
  return {
    title: ch.snippet.title,
    avatarUrl: ch.snippet.thumbnails.high?.url ?? ch.snippet.thumbnails.default?.url,
    subscriberCount: formatCount(raw),
    rawSubscribers: raw,
  };
}

export async function fetchYouTubeVideos(limit = 6): Promise<LatestVideo[] | null> {
  const key = process.env.YOUTUBE_API_KEY;
  const id = process.env.YOUTUBE_CHANNEL_ID;
  if (!key || !id) return null;
  const chData = await ytCached<any>(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${id}&key=${key}`,
    3600,
  );
  const uploadsPlaylistId = chData?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsPlaylistId) return null;
  const data = await ytCached<any>(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${limit}&playlistId=${uploadsPlaylistId}&key=${key}`,
    900,
  );
  return (data?.items ?? []).map((it: any) => {
    const s = it.snippet;
    const vid = s.resourceId.videoId;
    return {
      id: vid,
      title: s.title,
      thumbnail:
        s.thumbnails?.high?.url ??
        s.thumbnails?.medium?.url ??
        `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`,
      publishedAt: s.publishedAt,
    } satisfies LatestVideo;
  });
}

export async function fetchTwitchFollowers(login: string): Promise<TwitchStats | null> {
  try {
    const res = await fetch(`https://decapi.me/twitch/followcount/${encodeURIComponent(login)}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const text = (await res.text()).trim();
    const total = Number(text);
    if (!Number.isFinite(total) || total <= 0) return null;
    return { followerCount: total, followersLabel: formatCount(total) };
  } catch {
    return null;
  }
}
