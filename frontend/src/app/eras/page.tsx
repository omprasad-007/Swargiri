"use client";

import React, { useState } from "react";
import { Clock, Play, Disc, Sparkles } from "lucide-react";
import { useAudioPlayer, SongItem } from "@/context/AudioPlayerContext";

export default function MusicByEraPage() {
  const { playSong } = useAudioPlayer();
  const [activeEra, setActiveEra] = useState<string>("1990s");

  const eras = [
    { id: "1950s", title: "1950s - Golden Dawn", desc: "Classic Orchestral Ragas, Vintage Ghazals & Early Playback Era." },
    { id: "1960s", title: "1960s - Melody Renaissance", desc: "Soulful Devotional Kirtans, Sitar Virtuosity & Expressive Ghazals." },
    { id: "1970s", title: "1970s - Vinyl & Disco Fusion", desc: "Groovy Retro Fusion, Classical Jugalbandis & Epic Stotrams." },
    { id: "1980s", title: "1980s - Cassette Revolution", desc: "Bhakti Sangeet Boom, Synth Pop & Classical Masterpieces." },
    { id: "1990s", title: "1990s - Golden Indian Melodies", desc: "Melodious Romance, Iconic Devotional Albums & Acoustic Instruments." },
    { id: "2000s", title: "2000s - Digital Dawn & Sufi Fusion", desc: "Sufi Rock, Electronic Lounge, Modern Abhangs & Global Fusion." },
    { id: "2010s", title: "2010s - Indie & Acoustic Revival", desc: "Independent Creators, Acoustic Folk, Modern Mantra Soundscapes." },
    { id: "2020s", title: "2020s - Lo-fi & Spatial Audio Era", desc: "Ambient Lo-fi, High Fidelity Classical & Modern Spiritual Vibes." }
  ];

  const eraSongs: Record<string, SongItem[]> = {
    "1990s": [
      {
        id: "era-90-1",
        title: "Ghan Nila Guntala",
        artist: "Lata Mangeshkar",
        album: "Classic 90s Marathi",
        genre: "Regional",
        language: "Marathi",
        era: "1990s",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600",
        duration: 275,
        copyrightStatus: "Licensed",
        rightsHolder: "Saregama Heritage"
      },
      {
        id: "era-90-2",
        title: "Raag Yaman Morning Dawn",
        artist: "Ustad Shahid Parvez",
        album: "Morning Ragas Vol. 1",
        genre: "Indian Classical",
        language: "Instrumental",
        era: "1990s",
        raga: "Yaman",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        coverImage: "https://images.unsplash.com/photo-1545128485-c400e7702796?w=600",
        duration: 420,
        copyrightStatus: "Creator Authorized",
        rightsHolder: "Swargiri Classical"
      }
    ],
    "1980s": [
      {
        id: "era-80-1",
        title: "Majha Vithalu Abhang",
        artist: "Pandit Bhimsen Joshi",
        album: "Varkari Kirtan Legacy",
        genre: "Devotional",
        language: "Marathi",
        era: "1980s",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        coverImage: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600",
        duration: 310,
        copyrightStatus: "Licensed",
        rightsHolder: "Varkari Heritage Archive"
      }
    ],
    "2020s": [
      {
        id: "era-20-1",
        title: "Midnight Lo-fi Raga Fusion",
        artist: "Aethel Beats & Pandit Sen",
        album: "Chai & Lo-fi",
        genre: "Lo-fi",
        language: "Hindi",
        era: "2020s",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600",
        duration: 215,
        copyrightStatus: "Licensed",
        rightsHolder: "Swargiri Beats"
      }
    ]
  };

  const currentEraTracks = eraSongs[activeEra] || eraSongs["1990s"];

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] py-12 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header matching Stitch screen layout */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#201f1f] border border-[#f2ca50]/30 text-xs text-[#f2ca50] font-semibold mb-3">
          <Clock className="w-4 h-4" />
          <span>Decade-Based Music Discovery</span>
        </div>
        <h1 className="text-4xl font-extrabold font-heading text-white">Music By Era</h1>
        <p className="text-sm text-[#d0c5af] mt-2 max-w-xl">
          Travel through decades of musical heritage—from early 1950s golden classics to 2020s spatial lo-fi raga fusions.
        </p>
      </div>

      {/* Decade Timeline Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-10">
        {eras.map((e) => (
          <button
            key={e.id}
            onClick={() => setActiveEra(e.id)}
            className={`p-4 rounded-xl border text-center transition duration-300 ${
              activeEra === e.id
                ? "bg-gradient-to-b from-[#f2ca50] to-[#d4af37] text-black border-transparent font-bold shadow-xl scale-105"
                : "bg-[#1c1b1b] border-white/10 text-gray-300 hover:border-[#f2ca50]/40 hover:text-white"
            }`}
          >
            <div className="text-lg font-bold font-heading">{e.id}</div>
            <div className="text-[10px] opacity-80 uppercase mt-0.5">Decade</div>
          </button>
        ))}
      </div>

      {/* Selected Era Spotlight & Tracks */}
      <div className="bg-[#1c1b1b] border border-[#f2ca50]/20 rounded-2xl p-6 sm:p-8 shadow-2xl mb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-6 mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold font-heading text-white">
              {eras.find((e) => e.id === activeEra)?.title}
            </h2>
            <p className="text-sm text-[#d0c5af] mt-1">
              {eras.find((e) => e.id === activeEra)?.desc}
            </p>
          </div>
          <button
            onClick={() => playSong(currentEraTracks[0], currentEraTracks)}
            className="px-5 py-2.5 rounded-xl bg-[#f2ca50] text-black font-semibold text-xs flex items-center gap-2 hover:scale-105 transition"
          >
            <Play className="w-4 h-4 fill-current ml-0.5" /> Play Era Playlist
          </button>
        </div>

        {/* Tracks List */}
        <div className="space-y-3">
          {currentEraTracks.map((song, i) => (
            <div
              key={song.id}
              className="flex items-center justify-between p-4 rounded-xl bg-[#201f1f] hover:bg-[#2a2a2a] border border-white/5 hover:border-[#f2ca50]/30 transition group"
            >
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-500 w-6">{i + 1}</span>
                <img
                  src={song.coverImage}
                  alt={song.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h4 className="text-base font-bold text-white group-hover:text-[#f2ca50] transition">
                    {song.title}
                  </h4>
                  <p className="text-xs text-gray-400">{song.artist} • {song.genre} ({song.language})</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-xs px-2.5 py-1 rounded bg-black/40 text-[#d0c5af] border border-white/10">
                  {song.copyrightStatus}
                </span>
                <button
                  onClick={() => playSong(song, currentEraTracks)}
                  className="p-2.5 rounded-full bg-[#f2ca50] text-black hover:scale-110 transition"
                >
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
