export interface LatestVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

export const latestVideos: LatestVideo[] = [
  {
    id: "dQw4w9WgXcQ",
    title: "Latest Video Title",
    thumbnail: `https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`,
    publishedAt: "2024-01-15",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Another Awesome Video",
    thumbnail: `https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`,
    publishedAt: "2024-01-10",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Third Video Here",
    thumbnail: `https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`,
    publishedAt: "2024-01-05",
  },
];