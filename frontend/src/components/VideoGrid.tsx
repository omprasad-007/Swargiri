"use client";

import React from "react";
import { type VideoResult } from "@/lib/youtube";
import { VideoCard } from "./VideoCard";

interface VideoGridProps {
  videos: VideoResult[];
  onVideoClick: (video: VideoResult) => void;
}

export function VideoGrid({ videos, onVideoClick }: VideoGridProps) {
  if (videos.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-12">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} onClick={onVideoClick} />
      ))}
    </div>
  );
}
