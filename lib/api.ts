export interface YouTubeChannelInfo {
  avatarUrl: string;
  subscriberCount: string;
  title: string;
}

/**
 * Fetches YouTube channel info via YouTube Data API v3.
 * Requires YOUTUBE_API_KEY in environment variables.
 * 
 * Alternative: scrape the channel page for avatar/subs (no API key needed but less reliable).
 */
export async function fetchYouTubeChannel(handle: string): Promise<YouTubeChannelInfo | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return null;

  try {
    // First resolve handle to channel ID
    const searchRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(handle)}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    const searchData = await searchRes.json();
    const channelId = searchData.items?.[0]?.snippet?.channelId;
    if (!channelId) return null;

    // Fetch channel statistics
    const statsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelId}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    const statsData = await statsRes.json();
    const channel = statsData.items?.[0];
    if (!channel) return null;

    const subs = channel.statistics.subscriberCount;
    const formattedSubs = formatCount(Number(subs));
    const avatarUrl = channel.snippet.thumbnails.high?.url || channel.snippet.thumbnails.default?.url;

    return {
      avatarUrl,
      subscriberCount: formattedSubs,
      title: channel.snippet.title,
    };
  } catch {
    return null;
  }
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

/**
 * Fallback: scrape avatar from channel page (no API key).
 * Returns avatar URL if found.
 */
export async function scrapeYouTubeAvatar(handle: string): Promise<string | null> {
  try {
    const res = await fetch(`https://www.youtube.com/${handle}`, {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 3600 },
    });
    const html = await res.text();
    // Look for avatar in meta tags
    const match = html.match(/<link rel="image_src" href="([^"]+)"/) ||
                  html.match(/"avatarUrl":"([^"]+)"/) ||
                  html.match(/yt3\.ggpht\.com\/[^"]+/);
    return match ? match[1] || match[0] : null;
  } catch {
    return null;
  }
}