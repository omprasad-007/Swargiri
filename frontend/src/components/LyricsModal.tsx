"use client";

import React from "react";
import { useAudioPlayer } from "../context/AudioPlayerContext";
import { X, Music2, ShieldCheck } from "lucide-react";

export const LyricsModal: React.FC = () => {
  const { currentSong, isLyricsOpen, toggleLyricsModal } = useAudioPlayer();

  if (!isLyricsOpen || !currentSong) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#1c1b1b] border border-[#f2ca50]/20 rounded-2xl p-6 sm:p-8 text-white shadow-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-4">
            <img
              src={currentSong.coverImage || "https://images.unsplash.com/photo-1545128485-c400e7702796?w=200"}
              alt={currentSong.title}
              className="w-16 h-16 rounded-lg object-cover shadow-md border border-[#f2ca50]/30"
            />
            <div>
              <h2 className="text-2xl font-bold font-heading text-white">{currentSong.title}</h2>
              <p className="text-sm text-[#f2ca50] font-medium">{currentSong.artist}</p>
              <div className="flex items-center gap-2 mt-1 text-xs text-white/60">
                {currentSong.raga && <span>Raga: {currentSong.raga}</span>}
                {currentSong.taal && <span>• Taal: {currentSong.taal}</span>}
                {currentSong.era && <span>• Era: {currentSong.era}</span>}
              </div>
            </div>
          </div>
          <button
            onClick={toggleLyricsModal}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-6">
          {/* Rights Metadata Banner */}
          <div className="flex items-center gap-2 p-3 rounded-lg bg-[#2a2a2a] border border-[#d4af37]/30 text-xs text-[#d0c5af]">
            <ShieldCheck className="w-4 h-4 text-[#f2ca50] shrink-0" />
            <span>
              Licensed Metadata • <strong>{currentSong.copyrightStatus || "Licensed Content"}</strong> ({currentSong.rightsHolder || "Swargiri Ecosystem"})
            </span>
          </div>

          {/* Lyrics */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f2ca50] mb-3 flex items-center gap-2">
              <Music2 className="w-4 h-4" /> Synchronized Lyrics
            </h3>
            {currentSong.lyrics ? (
              <pre className="font-sans text-base leading-relaxed text-gray-200 whitespace-pre-wrap font-medium">
                {currentSong.lyrics}
              </pre>
            ) : (
              <p className="text-gray-400 italic">No lyrics available for this track.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
