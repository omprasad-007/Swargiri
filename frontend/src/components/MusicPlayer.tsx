"use client";

import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, ListMusic, Maximize2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const DEFAULT_SONG = {
  id: "vitthal-geete",
  title: "Vitthal Geete Marathi",
  artist: "Sumeet Music",
  thumbnail: "https://img.youtube.com/vi/W4-pYVb29p4/mqdefault.jpg",
  durationSeconds: 255,
};

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function MusicPlayer() {
  const [playerState, setPlayerState] = useLocalStorage("swargiri_player_state", {
    isPlaying: false,
    progress: 35,
    currentSong: DEFAULT_SONG,
  });

  const [favorites, setFavorites] = useLocalStorage<string[]>("swargiri_favorites", []);
  const [recentlyPlayed, setRecentlyPlayed] = useLocalStorage<typeof DEFAULT_SONG[]>(
    "swargiri_recently_played",
    []
  );

  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const { isPlaying, progress, currentSong } = playerState;

  useEffect(() => {
    // Initialize audio element if not exists
    if (!audioRef.current) {
      audioRef.current = new Audio("/audio/sample-bhajan.mp3"); // Using a sample local audio fallback for now if no src
    }
  }, []);

  useEffect(() => {
    setRecentlyPlayed((prev) => {
      const filtered = prev.filter((song) => song.id !== currentSong.id);
      return [currentSong, ...filtered].slice(0, 8);
    });
    
    // Reset and play new song when currentSong changes
    if (audioRef.current) {
      // audioRef.current.src = currentSong.audioUrl || "/audio/sample-bhajan.mp3";
      audioRef.current.currentTime = 0;
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  }, [currentSong, setRecentlyPlayed]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }

    if (!isPlaying) return;

    const interval = setInterval(() => {
      if (audioRef.current) {
         const current = audioRef.current.currentTime;
         const duration = audioRef.current.duration || currentSong.durationSeconds || 1;
         const nextProgress = (current / duration) * 100;
         
         setPlayerState((prev) => {
           if (nextProgress >= 100) {
             return { ...prev, progress: 0, isPlaying: false };
           }
           return { ...prev, progress: nextProgress };
         });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, setPlayerState, currentSong.durationSeconds]);

  const isFavorite = favorites.includes(currentSong.id);
  const durationSeconds = currentSong.durationSeconds ?? DEFAULT_SONG.durationSeconds;
  
  const currentTime = useMemo(() => {
    if (audioRef.current && !isNaN(audioRef.current.currentTime)) {
       return Math.floor(audioRef.current.currentTime);
    }
    return Math.floor((durationSeconds * progress) / 100);
  }, [progress, durationSeconds]);

  const toggleFavorite = () => {
    setFavorites((prev) => {
      if (prev.includes(currentSong.id)) {
        return prev.filter((id) => id !== currentSong.id);
      }
      return [currentSong.id, ...prev].slice(0, 50);
    });
  };

  const togglePlay = () => {
    setPlayerState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4"
    >
      <div className="max-w-7xl mx-auto glass rounded-3xl p-4 flex items-center justify-between border-white/5 border shadow-2xl backdrop-blur-3xl bg-stone-950/40">
        {/* Song Info */}
        <div className="flex items-center gap-4 w-1/3">
          <div className="relative h-14 w-14 rounded-xl overflow-hidden shadow-xl shrink-0">
            <img src={currentSong.thumbnail} alt="" className="object-cover w-full h-full" />
            {isPlaying && (
              <div className="absolute inset-0 bg-saffron/20 flex items-center justify-center">
                <div className="flex gap-0.5 items-end">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [4, 12, 4] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                      className="w-1 bg-white rounded-full"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="min-w-0 pr-4">
            <h4 className="font-black italic text-sm truncate uppercase tracking-tighter">{currentSong.title}</h4>
            <p className="text-[10px] font-bold text-saffron uppercase tracking-widest">{currentSong.artist}</p>
          </div>
          <button onClick={toggleFavorite} className="hover:text-saffron transition-colors" aria-label="Favorite">
            <Heart className={`h-4 w-4 ${isFavorite ? "text-saffron fill-saffron" : ""}`} />
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="flex items-center gap-8">
            <button className="text-foreground/40 hover:text-white transition-colors" aria-label="Previous">
              <SkipBack className="h-5 w-5 fill-current" />
            </button>
            <button
              onClick={togglePlay}
              className="h-12 w-12 rounded-full bg-white text-stone-950 flex items-center justify-center hover:scale-110 transition-all active:scale-95 shadow-xl shadow-white/10"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="fill-current h-5 w-5" /> : <Play className="fill-current h-5 w-5 ml-1" />}
            </button>
            <button className="text-foreground/40 hover:text-white transition-colors" aria-label="Next">
              <SkipForward className="h-5 w-5 fill-current" />
            </button>
          </div>

          <div className="w-full max-w-md flex items-center gap-3">
            <span className="text-[10px] font-bold opacity-40">{formatTime(currentTime)}</span>
            <div className="flex-1 h-1 bg-white/10 rounded-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 h-full bg-saffron transition-all" style={{ width: `${progress}%` }} />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ left: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] font-bold opacity-40">{formatTime(durationSeconds)}</span>
          </div>
        </div>

        {/* Extra Actions */}
        <div className="flex items-center justify-end gap-6 w-1/3">
          <div className="flex items-center gap-2 group cursor-pointer">
            <Volume2 className="h-4 w-4 text-foreground/40 group-hover:text-white transition-colors" />
            <div className="w-20 h-1 bg-white/10 rounded-full hidden md:block">
              <div className="w-2/3 h-full bg-white/40 rounded-full" />
            </div>
          </div>
          <button className="text-foreground/40 hover:text-white transition-colors hidden sm:block" aria-label="Queue">
            <ListMusic className="h-5 w-5" />
          </button>
          <button className="text-foreground/40 hover:text-white transition-colors hidden sm:block" aria-label="Expand">
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {recentlyPlayed.length > 0 && (
        <div className="max-w-7xl mx-auto mt-3 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">
          Recent: {recentlyPlayed.slice(0, 3).map((song) => song.title).join(" | ")}
        </div>
      )}
    </motion.div>
  );
}
