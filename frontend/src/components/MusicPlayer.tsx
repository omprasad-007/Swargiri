"use client";

import React, { useState } from "react";
import { useAudioPlayer } from "../context/AudioPlayerContext";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  VolumeX,
  FileText,
  ListMusic,
  Heart,
  Gauge
} from "lucide-react";

export const MusicPlayer: React.FC = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    playbackRate,
    isShuffle,
    repeatMode,
    favorites,
    togglePlayPause,
    seek,
    nextTrack,
    prevTrack,
    toggleShuffle,
    toggleRepeat,
    setVolumeLevel,
    setSpeedRate,
    toggleFavorite,
    toggleLyricsModal,
    toggleQueueDrawer
  } = useAudioPlayer();

  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  if (!currentSong) return null;

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const isFav = currentSong ? favorites.includes(currentSong.id) : false;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-[#1c1b1b]/95 backdrop-blur-xl border-t border-[#f2ca50]/20 px-4 py-3 text-white shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Track Info */}
        <div className="flex items-center gap-3 w-full md:w-1/4">
          <img
            src={currentSong.coverImage || "https://images.unsplash.com/photo-1545128485-c400e7702796?w=200"}
            alt={currentSong.title}
            className="w-12 h-12 rounded-lg object-cover border border-[#f2ca50]/30 shadow-md shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-semibold truncate text-white hover:text-[#f2ca50] transition cursor-pointer">
              {currentSong.title}
            </h4>
            <p className="text-xs text-[#d0c5af] truncate">{currentSong.artist}</p>
          </div>
          <button
            onClick={() => toggleFavorite(currentSong.id)}
            className={`p-1.5 rounded-full hover:bg-white/10 transition ${
              isFav ? "text-red-500 fill-current" : "text-gray-400 hover:text-white"
            }`}
          >
            <Heart className="w-5 h-5" />
          </button>
        </div>

        {/* Center: Controls & Timeline */}
        <div className="flex flex-col items-center gap-1.5 w-full md:w-2/4">
          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleShuffle}
              className={`p-1.5 rounded-full transition ${
                isShuffle ? "text-[#f2ca50]" : "text-gray-400 hover:text-white"
              }`}
              title="Shuffle"
            >
              <Shuffle className="w-4 h-4" />
            </button>
            <button onClick={prevTrack} className="p-1.5 text-gray-300 hover:text-white transition">
              <SkipBack className="w-5 h-5 fill-current" />
            </button>
            <button
              onClick={togglePlayPause}
              className="p-3 rounded-full bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-black hover:scale-105 transition shadow-lg"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>
            <button onClick={nextTrack} className="p-1.5 text-gray-300 hover:text-white transition">
              <SkipForward className="w-5 h-5 fill-current" />
            </button>
            <button
              onClick={toggleRepeat}
              className={`p-1.5 rounded-full transition ${
                repeatMode !== "off" ? "text-[#f2ca50]" : "text-gray-400 hover:text-white"
              }`}
              title={`Repeat: ${repeatMode}`}
            >
              <Repeat className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full text-xs text-gray-400">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={(e) => seek(Number(e.target.value))}
              className="flex-1 h-1 bg-[#353534] accent-[#f2ca50] rounded-lg cursor-pointer"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right: Volume, Speed & Modals */}
        <div className="flex items-center justify-end gap-3 w-full md:w-1/4">
          <button
            onClick={toggleLyricsModal}
            className="p-2 rounded-lg bg-[#201f1f] hover:bg-[#353534] text-gray-300 hover:text-[#f2ca50] transition flex items-center gap-1 text-xs"
            title="Lyrics & Rights"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden lg:inline">Lyrics</span>
          </button>

          {/* Speed Rate Menu */}
          <div className="relative">
            <button
              onClick={() => setShowSpeedMenu(!showSpeedMenu)}
              className="p-2 rounded-lg bg-[#201f1f] hover:bg-[#353534] text-gray-300 hover:text-[#f2ca50] transition text-xs flex items-center gap-1"
              title="Playback Speed"
            >
              <Gauge className="w-4 h-4" />
              <span>{playbackRate}x</span>
            </button>
            {showSpeedMenu && (
              <div className="absolute bottom-full right-0 mb-2 w-24 bg-[#201f1f] border border-white/10 rounded-xl p-1 shadow-xl text-xs space-y-1">
                {[0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => {
                      setSpeedRate(rate);
                      setShowSpeedMenu(false);
                    }}
                    className={`w-full text-left px-2 py-1 rounded hover:bg-white/10 ${
                      playbackRate === rate ? "text-[#f2ca50] font-bold" : "text-gray-300"
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setVolumeLevel(volume > 0 ? 0 : 0.8)}
              className="text-gray-400 hover:text-white transition"
            >
              {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(e) => setVolumeLevel(Number(e.target.value))}
              className="w-16 h-1 bg-[#353534] accent-[#f2ca50] rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
