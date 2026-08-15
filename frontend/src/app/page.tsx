"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Play, Sparkles, Disc, Radio, GraduationCap, Mic2, Building2, Clock, Music2, ShieldCheck, Heart } from "lucide-react";
import { useAudioPlayer, SongItem } from "@/context/AudioPlayerContext";

export default function HomePage() {
  const { playSong } = useAudioPlayer();
  const [selectedCategory, setSelectedCategory] = useState<string>("All Devotional");

  const devotionalCategories = [
    "All Devotional",
    "Vitthal Bhajans",
    "Krishna Bhajans",
    "Shiv Stotrams",
    "Ram Bhajans",
    "Ganesh Aartis",
    "Varkari Kirtans",
    "Indian Classical Ragas",
    "Meditation & Om Chants"
  ];

  const featuredDevotionalSongs: SongItem[] = [
    {
      id: "song-1",
      title: "Shiv Tandav Stotram",
      artist: "Ravan (Traditional)",
      album: "Sacred Stotrams",
      genre: "Devotional",
      language: "Sanskrit",
      era: "Historical",
      raga: "Bhairavi",
      taal: "Keherwa",
      audioUrl: "/audio/sample-bhajan.mp3",
      coverImage: "https://images.unsplash.com/photo-1545128485-c400e7702796?w=600&auto=format&fit=crop&q=80",
      duration: 372,
      lyrics: "Jataatavigalajjala pravahapavitasthale...\nGaleavalambya lambitam bhujangatungamalikam...",
      copyrightStatus: "Public Domain",
      rightsHolder: "Traditional Heritage"
    },
    {
      id: "song-2",
      title: "Majhe Maher Pandhari",
      artist: "Pt. Bhimsen Joshi",
      album: "Pandharpur Varkari Abhangas",
      genre: "Devotional",
      language: "Marathi",
      era: "Historical",
      raga: "Yaman",
      taal: "Bhajani",
      audioUrl: "https://ia800201.us.archive.org/13/items/AbhangasByPt.BhimsenJoshi/MajheMaherPandhari.mp3",
      coverImage: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80",
      duration: 405,
      lyrics: "Majhe maher pandhari aahe bhivareche teeri...",
      copyrightStatus: "Public Domain",
      rightsHolder: "Varkari Heritage Archive"
    },
    {
      id: "song-3",
      title: "Achyutam Keshavam Krishna Damodaram",
      artist: "Traditional Chants",
      album: "Vrindavan Devotional Chants",
      genre: "Devotional",
      language: "Sanskrit",
      era: "Traditional",
      raga: "Desh",
      audioUrl: "https://ia801509.us.archive.org/17/items/AchyutamKeshavam/AchyutamKeshavam.mp3",
      coverImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600&auto=format&fit=crop&q=80",
      duration: 330,
      lyrics: "Achyutam Keshavam Krishna Damodaram...\nRama Narayanam Janaki Vallabham...",
      copyrightStatus: "Public Domain",
      rightsHolder: "Sacred Heritage"
    },
    {
      id: "song-4",
      title: "Roop Pahata Lochani",
      artist: "Lata Mangeshkar",
      album: "Abhanga Gatha",
      genre: "Devotional",
      language: "Marathi",
      era: "Traditional",
      raga: "Kafi",
      taal: "Bhajani",
      audioUrl: "https://ia800300.us.archive.org/4/items/LataMangeshkarAbhangs/RoopPahataLochani.mp3",
      coverImage: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=600&auto=format&fit=crop&q=80",
      duration: 320,
      lyrics: "Roop pahata lochani sukh jhale ho sajani...",
      copyrightStatus: "Licensed",
      rightsHolder: "Bhakti Sangeet"
    },
    {
      id: "song-5",
      title: "Raag Yaman Morning Meditation",
      artist: "Ustad Shahid Parvez",
      album: "Morning Ragas Vol. 1",
      genre: "Indian Classical",
      language: "Instrumental",
      era: "Classical",
      raga: "Yaman",
      taal: "Teental",
      audioUrl: "https://ia800502.us.archive.org/1/items/KishoriAmonkarDevotional/AvaghaRangEkZala.mp3",
      coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
      duration: 420,
      lyrics: "Instrumental Sitar Performance",
      copyrightStatus: "Creator Authorized",
      rightsHolder: "Swargiri Classical"
    },
    {
      id: "song-6",
      title: "Om Namah Shivaya (Calm Meditation)",
      artist: "Suresh Wadkar",
      album: "Spiritual Pranayama",
      genre: "Meditation & Om Chants",
      language: "Sanskrit",
      era: "Modern",
      audioUrl: "https://ia800301.us.archive.org/5/items/SureshWadkarShivBhajans/OmNamahShivaya.mp3",
      coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80",
      duration: 720,
      copyrightStatus: "Public Domain",
      rightsHolder: "Dhyan Wellness"
    }
  ];

  const filteredSongs = selectedCategory === "All Devotional"
    ? featuredDevotionalSongs
    : featuredDevotionalSongs.filter((s) => 
        s.genre.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        s.title.toLowerCase().includes(selectedCategory.toLowerCase())
      );

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1]">
      {/* Hero Banner Section for Devotional Platform */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f2ca50]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#201f1f] border border-[#f2ca50]/30 text-xs text-[#f2ca50] font-semibold">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Sacred Sanctuary of Bhajans, Kirtans & Spiritual Music</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold font-heading text-white leading-tight tracking-tight">
              Divine Bhajans. <br />
              Soulful Kirtans. <span className="text-gold-gradient">Eternal Peace.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#d0c5af] leading-relaxed max-w-2xl">
              Immerse yourself in authentic Vitthal, Krishna, Shiv, Ram & Ganesh Bhajans, Varkari Abhangas, Haripath, Kirtan discourses, and Indian Classical Ragas.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => playSong(featuredDevotionalSongs[0], featuredDevotionalSongs)}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-black font-bold text-sm shadow-xl hover:scale-105 transition flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-current ml-0.5" /> Listen To Sacred Bhajans
              </button>
              <Link
                href="/bhajans"
                className="px-6 py-3.5 rounded-xl bg-[#201f1f] hover:bg-[#2a2a2a] border border-white/10 text-white font-semibold text-sm transition flex items-center gap-2"
              >
                <Music2 className="w-4 h-4 text-[#f2ca50]" /> Explore All Deity Bhajans
              </Link>
            </div>
          </div>

          {/* Right Spotlight Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-[#1c1b1b] border border-[#f2ca50]/20 p-6 shadow-2xl overflow-hidden group">
              <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                <img
                  src={featuredDevotionalSongs[0].coverImage}
                  alt={featuredDevotionalSongs[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] uppercase font-bold text-[#f2ca50]">
                  Devotional Spotlight
                </span>
                <button
                  onClick={() => playSong(featuredDevotionalSongs[0], featuredDevotionalSongs)}
                  className="absolute bottom-4 right-4 p-4 rounded-full bg-[#f2ca50] text-black shadow-xl hover:scale-110 transition"
                >
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </button>
              </div>
              <h3 className="text-xl font-bold font-heading text-white">{featuredDevotionalSongs[0].title}</h3>
              <p className="text-sm text-[#f2ca50] mt-1">{featuredDevotionalSongs[0].artist}</p>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10 text-xs text-gray-400">
                <span>Raga: {featuredDevotionalSongs[0].raga} • {featuredDevotionalSongs[0].taal}</span>
                <span className="flex items-center gap-1 text-[#d0c5af]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#f2ca50]" /> Sacred Heritage
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Devotional Category Pills */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold font-heading text-white flex items-center gap-2">
            <Disc className="w-5 h-5 text-[#f2ca50]" /> Devotional Categories
          </h2>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
          {devotionalCategories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                selectedCategory === c
                  ? "bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-black border-transparent shadow-lg"
                  : "bg-[#1c1b1b] text-gray-300 border-white/10 hover:border-[#f2ca50]/40 hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Devotional Song Cards Grid */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSongs.map((song) => (
            <div
              key={song.id}
              className="bg-[#1c1b1b] border border-white/5 hover:border-[#f2ca50]/30 rounded-2xl p-4 transition duration-300 hover:-translate-y-1 shadow-lg group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 rounded-xl overflow-hidden mb-3">
                  <img
                    src={song.coverImage}
                    alt={song.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition" />
                  <span className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-bold text-[#f2ca50]">
                    {song.genre}
                  </span>
                  <button
                    onClick={() => playSong(song, featuredDevotionalSongs)}
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-[#f2ca50] text-black shadow-lg opacity-90 group-hover:opacity-100 group-hover:scale-110 transition"
                  >
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </button>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-[#f2ca50] transition truncate">
                  {song.title}
                </h4>
                <p className="text-xs text-gray-400 mt-1">{song.artist} • {song.language}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#d0c5af]">
                <span>{song.album}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#2a2a2a] text-[#f2ca50]">
                  {song.copyrightStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Devotional Ecosystem Hub Cards (Bhajans, Kirtans, Learning, Meditation) */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto mb-20">
        <div className="border-t border-white/10 pt-12">
          <h2 className="text-2xl font-bold font-heading text-white mb-8 text-center sm:text-left">
            Devotional Experience Hubs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Deity Bhajans */}
            <Link
              href="/bhajans"
              className="p-6 rounded-2xl bg-[#1c1b1b] border border-white/10 hover:border-[#f2ca50]/40 transition group hover:-translate-y-1 shadow-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-[#201f1f] flex items-center justify-center mb-4 text-[#f2ca50] group-hover:scale-110 transition">
                <Music2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#f2ca50] transition">Deity Bhajans</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Collection of Vitthal, Krishna, Shiv, Ram & Ganesh Bhajans & Aartis.
              </p>
            </Link>

            {/* Varkari Kirtans */}
            <Link
              href="/kirtans"
              className="p-6 rounded-2xl bg-[#1c1b1b] border border-white/10 hover:border-[#f2ca50]/40 transition group hover:-translate-y-1 shadow-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-[#201f1f] flex items-center justify-center mb-4 text-[#f2ca50] group-hover:scale-110 transition">
                <Mic2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#f2ca50] transition">Varkari Kirtans</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Live and recorded Kirtan discourses, Abhangwani, and Haripath chants.
              </p>
            </Link>

            {/* Devotional Academy */}
            <Link
              href="/learn"
              className="p-6 rounded-2xl bg-[#1c1b1b] border border-white/10 hover:border-[#f2ca50]/40 transition group hover:-translate-y-1 shadow-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-[#201f1f] flex items-center justify-center mb-4 text-[#f2ca50] group-hover:scale-110 transition">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#f2ca50] transition">Harmonium & Tabla Academy</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Learn Bhajan singing, Harmonium, Tabla, and Raga compositions.
              </p>
            </Link>

            {/* Calm & Meditation */}
            <Link
              href="/calm"
              className="p-6 rounded-2xl bg-[#1c1b1b] border border-white/10 hover:border-[#f2ca50]/40 transition group hover:-translate-y-1 shadow-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-[#201f1f] flex items-center justify-center mb-4 text-[#f2ca50] group-hover:scale-110 transition">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#f2ca50] transition">Calm & Meditation</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Om Chanting, Pranayama audio, and peaceful spiritual soundscapes.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
