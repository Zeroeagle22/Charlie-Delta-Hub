"use client";

import useSWR from "swr";

export function useDiscordMembers() {
  const { data, error, isLoading } = useSWR<{ memberCount: number }>(
    "/api/discord/stats",
    (url) => fetch(url).then((r) => r.json()),
    {
      refreshInterval: 300_000,
      fallbackData: { memberCount: 1256 },
      revalidateOnFocus: false,
    }
  );

  return {
    memberCount: data?.memberCount ?? 6210,
    isLoading: isLoading && !data,
    error,
  };
}