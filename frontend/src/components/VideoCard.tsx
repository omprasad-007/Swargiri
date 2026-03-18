"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, Calendar, User } from "lucide-react";
import { type VideoResult } from "@/lib/youtube";
import { formatDate } from "@/lib/utils";

interface VideoCardProps {
  video: VideoResult;
  onClick: (video: VideoResult) => void;
}

export function VideoCard({ video, onClick }: VideoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative h-full flex flex-col glass overflow-hidden rounded-3xl cursor-pointer"
      onClick={() => onClick(video)}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="p-4 bg-white/20 backdrop-blur-md rounded-full scale-0 group-hover:scale-100 transition-transform duration-500">
            <Play className="text-white h-8 w-8 fill-current" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-transparent to-black/5 dark:to-white/5">
        <h3 className="text-lg font-bold text-foreground mb-4 line-clamp-2 leading-tight group-hover:text-primary-purple transition-colors" dangerouslySetInnerHTML={{ __html: video.title }} />
        
        <div className="mt-auto space-y-2">
          <div className="flex items-center gap-2 text-sm text-foreground/50">
            <User className="h-4 w-4" />
            <span className="truncate">{video.channelTitle}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground/40">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(video.publishTime)}</span>
          </div>
        </div>
        
        <button className="mt-6 w-full py-2.5 rounded-xl border border-foreground/10 font-bold text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors">
          Watch Now
        </button>
      </div>

      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500 -z-10" />
    </motion.div>
  );
}
