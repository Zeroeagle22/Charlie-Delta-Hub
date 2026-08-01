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

interface TwitchToken {
  token: string;
  expiresAt: number;
}

let tokenCache: TwitchToken | null = null;

async function twitchAppToken(): Promise<string | null> {
  const cid = process.env.TWITCH_CLIENT_ID;
  const sec = process.env.TWITCH_CLIENT_SECRET;
  if (!cid || !sec) return null;
  if (tokenCache && tokenCache.expiresAt > Date.now()) return tokenCache.token;
  const res = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${cid}&client_secret=${sec}&grant_type=client_credentials`,
    { method: "POST" },
  );
  if (!res.ok) return null;
  const data = await res.json();
  tokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };
  return tokenCache.token;
}

export async function fetchTwitchFollowers(): Promise<TwitchStats | null> {
  const cid = process.env.TWITCH_CLIENT_ID;
  const bid = process.env.TWITCH_BROADCASTER_ID;
  if (!cid || !bid) return null;
  const token = await twitchAppToken();
  if (!token) return null;
  // Note: channels/followers needs an app access token and works for your own channel.
  // Fallback if it 403s: use https://api.twitch.tv/helix/users/follows?to_id=<bid> (deprecated).
  const res = await fetch(
    `https://api.twitch.tv/helix/channels/followers?broadcaster_id=${bid}`,
    {
      headers: { "Client-Id": cid, Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
    },
  );
  if (!res.ok) return null;
  const data = await res.json();
  const total = Number(data.total ?? 0);
  return { followerCount: total, followersLabel: formatCount(total) };
}
