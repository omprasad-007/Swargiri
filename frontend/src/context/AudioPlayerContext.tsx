"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export interface SongItem {
  id: string;
  title: string;
  artist: string;
  album?: string;
  genre?: string;
  language?: string;
  era?: string;
  raga?: string;
  taal?: string;
  audioUrl: string;
  coverImage?: string;
  duration?: number;
  lyrics?: string;
  copyrightStatus?: string;
  rightsHolder?: string;
}

interface AudioPlayerContextType {
  currentSong: SongItem | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;
  isShuffle: boolean;
  repeatMode: "off" | "all" | "one";
  queue: SongItem[];
  queueIndex: number;
  isLyricsOpen: boolean;
  isQueueOpen: boolean;
  favorites: string[];
  playSong: (song: SongItem, newQueue?: SongItem[]) => void;
  togglePlayPause: () => void;
  seek: (time: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  setVolumeLevel: (vol: number) => void;
  setSpeedRate: (rate: number) => void;
  addToQueue: (song: SongItem) => void;
  toggleFavorite: (songId: string) => void;
  toggleLyricsModal: () => void;
  toggleQueueDrawer: () => void;
}

const DEFAULT_SONG: SongItem = {
  id: "demo-1",
  title: "Shiv Tandav Stotram",
  artist: "Ravan (Traditional)",
  album: "Sacred Stotram",
  genre: "Devotional",
  language: "Sanskrit",
  era: "Historical",
  raga: "Bhairavi",
  audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  coverImage: "https://images.unsplash.com/photo-1545128485-c400e7702796?w=600&auto=format&fit=crop&q=80",
  duration: 372,
  lyrics: "Jataatavigalajjala pravahapavitasthale...\nGaleavalambya lambitam bhujangatungamalikam...",
  copyrightStatus: "Public Domain",
  rightsHolder: "Traditional Public Domain"
};

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentSong, setCurrentSong] = useState<SongItem | null>(DEFAULT_SONG);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(372);
  const [queue, setQueue] = useState<SongItem[]>([DEFAULT_SONG]);
  const [queueIndex, setQueueIndex] = useState<number>(0);

  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("off");
  const [isLyricsOpen, setIsLyricsOpen] = useState<boolean>(false);
  const [isQueueOpen, setIsQueueOpen] = useState<boolean>(false);

  // Local Storage Persistence
  const [volume, setVolume] = useLocalStorage<number>("swargiri_player_volume", 0.8);
  const [playbackRate, setPlaybackRate] = useLocalStorage<number>("swargiri_player_speed", 1.0);
  const [favorites, setFavorites] = useLocalStorage<string[]>("swargiri_player_favorites", ["demo-1"]);

  // Initialize Audio object safely in client
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio();

      const audio = audioRef.current;
      audio.volume = volume;
      audio.playbackRate = playbackRate;

      const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
      const handleLoadedMetadata = () => setDuration(audio.duration || currentSong?.duration || 0);
      const handleEnded = () => nextTrack();

      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("ended", handleEnded);

      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("ended", handleEnded);
        audio.pause();
      };
    }
  }, []);

  // Update src when currentSong changes
  useEffect(() => {
    if (audioRef.current && currentSong?.audioUrl) {
      const audio = audioRef.current;
      audio.src = currentSong.audioUrl;
      if (isPlaying) {
        audio.play().catch((e) => console.warn("Audio play interrupted:", e));
      }
    }
  }, [currentSong]);

  const playSong = (song: SongItem, newQueue?: SongItem[]) => {
    setCurrentSong(song);
    if (newQueue && newQueue.length > 0) {
      setQueue(newQueue);
      const idx = newQueue.findIndex((s) => s.id === song.id);
      setQueueIndex(idx >= 0 ? idx : 0);
    } else {
      if (!queue.some((s) => s.id === song.id)) {
        setQueue((prev) => [...prev, song]);
      }
    }
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = song.audioUrl;
      audioRef.current.play().catch((err) => console.warn(err));
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch((err) => console.warn(err));
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const nextTrack = () => {
    if (repeatMode === "one" && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => console.warn(err));
      return;
    }

    if (queue.length === 0) return;

    let nextIdx = queueIndex + 1;
    if (isShuffle) {
      nextIdx = Math.floor(Math.random() * queue.length);
    } else if (nextIdx >= queue.length) {
      nextIdx = repeatMode === "all" ? 0 : queue.length - 1;
    }

    setQueueIndex(nextIdx);
    playSong(queue[nextIdx]);
  };

  const prevTrack = () => {
    if (currentTime > 3 && audioRef.current) {
      audioRef.current.currentTime = 0;
      return;
    }
    let prevIdx = queueIndex - 1;
    if (prevIdx < 0) prevIdx = queue.length - 1;
    setQueueIndex(prevIdx);
    playSong(queue[prevIdx]);
  };

  const toggleShuffle = () => setIsShuffle(!isShuffle);

  const toggleRepeat = () => {
    const modes: ("off" | "all" | "one")[] = ["off", "all", "one"];
    const next = modes[(modes.indexOf(repeatMode) + 1) % modes.length];
    setRepeatMode(next);
  };

  const setVolumeLevel = (vol: number) => {
    setVolume(vol);
    if (audioRef.current) audioRef.current.volume = vol;
  };

  const setSpeedRate = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) audioRef.current.playbackRate = rate;
  };

  const addToQueue = (song: SongItem) => {
    setQueue((prev) => [...prev, song]);
  };

  const toggleFavorite = (songId: string) => {
    if (favorites.includes(songId)) {
      setFavorites(favorites.filter((id) => id !== songId));
    } else {
      setFavorites([...favorites, songId]);
    }
  };

  const toggleLyricsModal = () => setIsLyricsOpen(!isLyricsOpen);
  const toggleQueueDrawer = () => setIsQueueOpen(!isQueueOpen);

  return (
    <AudioPlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        currentTime,
        duration,
        volume,
        playbackRate,
        isShuffle,
        repeatMode,
        queue,
        queueIndex,
        isLyricsOpen,
        isQueueOpen,
        favorites,
        playSong,
        togglePlayPause,
        seek,
        nextTrack,
        prevTrack,
        toggleShuffle,
        toggleRepeat,
        setVolumeLevel,
        setSpeedRate,
        addToQueue,
        toggleFavorite,
        toggleLyricsModal,
        toggleQueueDrawer
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error("useAudioPlayer must be used within an AudioPlayerProvider");
  }
  return context;
};
