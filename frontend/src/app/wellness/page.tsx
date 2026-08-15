"use client";

import React from "react";
import { Building2, ShieldCheck, Heart, Play, Headphones, Users, Lock } from "lucide-react";
import { useAudioPlayer, SongItem } from "@/context/AudioPlayerContext";

export default function CorporateWellnessPage() {
  const { playSong } = useAudioPlayer();

  const wellnessPlaylists: SongItem[] = [
    {
      id: "well-1",
      title: "Deep Focus Chai & Lo-fi Beats",
      artist: "Swargiri Wellness Labs",
      album: "Corporate Focus",
      genre: "Lo-fi",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600",
      duration: 215,
      copyrightStatus: "Licensed"
    },
    {
      id: "well-2",
      title: "Pranayama & Afternoon Stress Relief",
      artist: "Swami Dhyanananda",
      album: "Office Meditation",
      genre: "Meditation",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
      coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600",
      duration: 540,
      copyrightStatus: "Public Domain"
    }
  ];

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] py-12 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#201f1f] border border-[#f2ca50]/30 text-xs text-[#f2ca50] font-semibold mb-3">
          <Building2 className="w-4 h-4" />
          <span>Corporate Wellness & Employee Productivity Hub</span>
        </div>
        <h1 className="text-4xl font-extrabold font-heading text-white">Corporate Wellness</h1>
        <p className="text-sm text-[#d0c5af] mt-2 max-w-xl">
          Empower teams with curated focus soundscapes, guided meditation, acoustic stress-relief playlists, and privacy-preserving organization analytics.
        </p>
      </div>

      {/* Employee Privacy Banner */}
      <div className="p-4 rounded-xl bg-[#201f1f] border border-[#f2ca50]/20 flex items-center gap-3 text-xs text-[#d0c5af] mb-10 shadow-lg">
        <Lock className="w-5 h-5 text-[#f2ca50] shrink-0" />
        <span>
          <strong>Strict Employee Privacy Guarantee:</strong> Individual employee listening logs are strictly confidential and never exposed to employers. Organizations receive aggregated group metrics only.
        </span>
      </div>

      {/* Wellness Playlists */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold font-heading text-white mb-6 flex items-center gap-2">
          <Headphones className="w-5 h-5 text-[#f2ca50]" /> Recommended Wellness Sessions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wellnessPlaylists.map((pl) => (
            <div
              key={pl.id}
              className="p-6 rounded-2xl bg-[#1c1b1b] border border-white/10 hover:border-[#f2ca50]/30 transition shadow-2xl flex items-center gap-4 group"
            >
              <img
                src={pl.coverImage}
                alt={pl.title}
                className="w-24 h-24 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#f2ca50] text-black">
                  {pl.genre}
                </span>
                <h3 className="text-lg font-bold text-white mt-1 group-hover:text-[#f2ca50] transition">
                  {pl.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1">{pl.artist}</p>
                <button
                  onClick={() => playSong(pl, wellnessPlaylists)}
                  className="mt-3 px-4 py-1.5 rounded-lg bg-[#f2ca50] text-black font-bold text-xs flex items-center gap-1.5 hover:scale-105 transition"
                >
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" /> Start Session
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Aggregated Organization Stats Preview */}
      <div className="p-8 rounded-2xl bg-[#1c1b1b] border border-white/10 shadow-2xl">
        <h3 className="text-xl font-bold font-heading text-white mb-4">Sample Organization Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-[#201f1f]">
            <p className="text-xs text-gray-400">Total Employees</p>
            <p className="text-2xl font-bold font-heading text-white mt-1">250 Active</p>
          </div>
          <div className="p-4 rounded-xl bg-[#201f1f]">
            <p className="text-xs text-gray-400">Total Wellness Hours</p>
            <p className="text-2xl font-bold font-heading text-[#f2ca50] mt-1">1,420 Hours</p>
          </div>
          <div className="p-4 rounded-xl bg-[#201f1f]">
            <p className="text-xs text-gray-400">Top Focus Genre</p>
            <p className="text-2xl font-bold font-heading text-white mt-1">Lo-fi & Instrumental</p>
          </div>
        </div>
      </div>
    </div>
  );
}
