import LinksPageClient from "./LinksPageClient";
import { fetchYouTubeStats, fetchYouTubeVideos, fetchTwitchFollowers } from "@/lib/api";
import type { Stat } from "@/lib/links";

export const revalidate = 900;

export default async function Page() {
  const [ytStats, ytVideos, twitchStats] = await Promise.all([
    fetchYouTubeStats(),
    fetchYouTubeVideos(6),
    fetchTwitchFollowers(),
  ]);

  const statOverrides: Partial<Record<string, Stat>> = {};
  if (ytStats) statOverrides.YouTube = { value: ytStats.subscriberCount, label: "Subscribers" };
  if (twitchStats) statOverrides.Twitch = { value: twitchStats.followersLabel, label: "Followers" };

  return <LinksPageClient statOverrides={statOverrides} videos={ytVideos ?? []} />;
}
