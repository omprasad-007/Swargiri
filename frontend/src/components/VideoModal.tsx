"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Share2, ExternalLink, RefreshCw, AlertCircle } from "lucide-react";
import { type VideoResult } from "@/lib/youtube";

interface VideoModalProps {
  video: VideoResult | null;
  onClose: () => void;
}

export function VideoModal({ video, onClose }: VideoModalProps) {
  const [origin, setOrigin] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    if (video) {
      setHasError(false);
      setIsLoading(true);
      setShowHelp(false);
    }
  }, [video]);

  // Get origin for YouTube API security
  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  // Handle body overflow
  useEffect(() => {
    if (video) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [video]);

  return (
    <AnimatePresence>
      {video && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-8">
          {/* Enhanced Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/95 backdrop-blur-3xl"
          />

          {/* Ultra-Robust Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative w-full max-w-6xl flex flex-col glass border-white/20 rounded-[1.5rem] md:rounded-[3rem] shadow-[0_0_120px_rgba(168,85,247,0.5)] overflow-hidden"
          >
            {/* Header Content */}
            <div className="p-4 md:p-6 flex items-center justify-between bg-white/5 border-b border-white/10">
              <div className="flex flex-col gap-1 min-w-0 pr-4">
                <h3 className="text-white font-black truncate text-lg md:text-xl md:max-w-xl italic tracking-tight" dangerouslySetInnerHTML={{ __html: video.title }} />
                <div className="flex items-center gap-2">
                  <span className="text-xs text-primary-purple font-bold uppercase tracking-widest">{video.channelTitle}</span>
                  <div className="h-1 w-1 rounded-full bg-white/20" />
                  <span className="text-[10px] text-white/30 uppercase font-medium">Verified Devotional Content</span>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${video.id}`);
                    alert("Video link copied to clipboard!");
                  }}
                  className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all group"
                  title="Share Video"
                >
                  <Share2 className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </button>
                <button
                  onClick={() => setShowHelp(!showHelp)}
                  className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all flex items-center gap-2"
                  title="Playback Help"
                >
                  <AlertCircle className="h-5 w-5" />
                  <span className="hidden md:inline text-[10px] font-bold uppercase">Video not playing?</span>
                </button>
                <a 
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank" rel="noreferrer"
                  className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all group"
                  title="Watch on YouTube Website"
                >
                  <ExternalLink className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </a>
                <button
                  onClick={onClose}
                  className="p-2.5 rounded-full bg-red-500/10 hover:bg-red-500 text-white transition-all shadow-lg"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Help Alert Overlay */}
            <AnimatePresence>
              {showHelp && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-red-500/10 border-b border-red-500/20 overflow-hidden"
                >
                  <div className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                      <p className="text-xs text-red-200/70 font-medium">
                        Some videos may have embedding restricted in certain regions or on localhost.
                      </p>
                    </div>
                    <div className="flex gap-2">
                       <a 
                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(video.title)}`}
                        target="_blank" rel="noreferrer"
                        className="px-4 py-1.5 bg-white/5 hover:bg-white/10 rounded-full text-[10px] font-bold text-white transition-all"
                      >
                        Search Alternative
                      </a>
                      <a 
                        href={`https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank" rel="noreferrer"
                        className="px-4 py-1.5 bg-red-500 hover:bg-red-600 rounded-full text-[10px] font-bold text-white transition-all"
                      >
                        Play on YouTube
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Robust Player Container */}
            <div className="relative w-full aspect-video bg-black/80 flex items-center justify-center group/player">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/40 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-4">
                    <RefreshCw className="h-10 w-10 text-primary-purple animate-spin" />
                    <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">Invoking Divine Melody...</span>
                  </div>
                </div>
              )}
              
              {hasError ? (
                <div className="flex flex-col items-center gap-4 text-center px-6">
                  <AlertCircle className="h-16 w-16 text-red-500" />
                  <h4 className="text-2xl font-bold">Playback Restricted</h4>
                  <p className="text-white/50 max-w-md">YouTube has restricted this content from being played here. Please watch it directly on their platform.</p>
                  <a 
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank" rel="noreferrer"
                    className="mt-4 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all shadow-[0_0_30px_rgba(220,38,38,0.4)]"
                  >
                    Open Official YouTube Player
                  </a>
                </div>
              ) : (
                <iframe
                  id="youtube-player"
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&enablejsapi=1${origin ? `&origin=${origin}` : ''}`}
                  title={video.title}
                  onLoad={() => setIsLoading(false)}
                  onError={() => setHasError(true)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-none shadow-2xl"
                />
              )}
            </div>
            
            {/* Spiritual Note Bar */}
            <div className="p-4 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-transparent flex flex-col md:flex-row items-center justify-between px-8 gap-4">
              <span className="text-[10px] md:text-xs font-black tracking-[0.2em] text-white/40 uppercase text-center md:text-left">
                Divine Vibration - Universal Peace - Spiritual Growth
              </span>
              <div className="flex gap-4">
                 <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                 <div className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse delay-75" />
                 <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse delay-150" />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
