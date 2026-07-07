export type Reel = {
  id: string;
  title: string;
  handle: string;
  category: string;
  poster: string;
  /** Self-hosted mp4 — preferred for in-modal playback. */
  video?: string;
  /**
   * Instagram reel permalink OR bare shortcode (external link fallback).
   * e.g. "https://www.instagram.com/reel/ABC123/" or just "ABC123".
   */
  url?: string;
  /** YouTube id — used only when `video` and `url` are absent. */
  youtubeId?: string;
};

const HANDLE = "@tba_creatives";

/**
 * Real reels from The Better Agency (@tba_creatives). Posters and mp4s are
 * self-hosted for fast carousel thumbnails and reliable in-modal playback.
 */
export const reels: Reel[] = [
  {
    id: "reel-empire",
    title: "Need an Empire?",
    handle: HANDLE,
    category: "Brand · Marketing",
    poster: "/images/reels/DaVMcrchtVo.jpg",
    video: "/videos/reels/DaVMcrchtVo.mp4",
    url: "https://www.instagram.com/reel/DaVMcrchtVo/",
  },
  {
    id: "reel-session",
    title: "Inside the Room",
    handle: HANDLE,
    category: "Studio · Session",
    poster: "/images/reels/DYE-aiIH6tZ.jpg",
    video: "/videos/reels/DYE-aiIH6tZ.mp4",
    url: "https://www.instagram.com/reel/DYE-aiIH6tZ/",
  },
  {
    id: "reel-kalyan",
    title: "Kalyan Silks",
    handle: HANDLE,
    category: "Fashion · Campaign",
    poster: "/images/reels/DTsWB1KET7a.jpg",
    video: "/videos/reels/DTsWB1KET7a.mp4",
    url: "https://www.instagram.com/reel/DTsWB1KET7a/",
  },
  {
    id: "reel-wrapped",
    title: "The Better Agency, Wrapped",
    handle: HANDLE,
    category: "Studio · Recap",
    poster: "/images/reels/DT0HDhFARJf.jpg",
    video: "/videos/reels/DT0HDhFARJf.mp4",
    url: "https://www.instagram.com/reel/DT0HDhFARJf/",
  },
  {
    id: "reel-coolie",
    title: "Coolie: Power Office",
    handle: HANDLE,
    category: "Culture · Trend",
    poster: "/images/reels/DNQfSB0pY0H.jpg",
    video: "/videos/reels/DNQfSB0pY0H.mp4",
    url: "https://www.instagram.com/reel/DNQfSB0pY0H/",
  },
  {
    id: "reel-smiles",
    title: "Smiles Made It Better",
    handle: HANDLE,
    category: "Culture · Team",
    poster: "/images/reels/DPTyiVTgcTR.jpg",
    video: "/videos/reels/DPTyiVTgcTR.mp4",
    url: "https://www.instagram.com/reel/DPTyiVTgcTR/",
  },
];
