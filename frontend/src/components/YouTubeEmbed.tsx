"use client";

import React, { useState, useEffect } from "react";
import { AlertCircle, RefreshCw, ExternalLink } from "lucide-react";

interface YouTubeEmbedProps {
  youtubeId: string;
  title: string;
}

export default function YouTubeEmbed({
  youtubeId,
  title,
}: YouTubeEmbedProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  return (
    <div className="relative aspect-video w-full bg-black/20 rounded-xl overflow-hidden group">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-10">
          <RefreshCw className="h-8 w-8 text-primary animate-spin" />
        </div>
      )}

      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black/60 backdrop-blur-md">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h4 className="text-white font-bold mb-2">Video Unavailable</h4>
          <p className="text-white/60 text-xs mb-4">This video may have embedding restrictions.</p>
          <a 
            href={`https://www.youtube.com/watch?v=${youtubeId}`}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-full transition-all"
          >
            <ExternalLink className="h-4 w-4" />
            Watch on YouTube
          </a>
        </div>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?rel=0&enablejsapi=1${origin ? `&origin=${origin}` : ""}`}
          title={title}
          onLoad={() => setIsLoading(false)}
          onError={() => setHasError(true)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full rounded-xl border-none shadow-2xl"
        />
      )}
    </div>
  );
}
