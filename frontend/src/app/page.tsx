"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SearchBar } from "@/components/SearchBar";
import { VideoGrid } from "@/components/VideoGrid";
import { VideoModal } from "@/components/VideoModal";
import { SpiritualQuote } from "@/components/SpiritualQuote";
import { MoodGenerator } from "@/components/MoodGenerator";
import { LottieLotus } from "@/components/LottieLotus";
import { searchYouTubeVideos, type VideoResult } from "@/lib/youtube";
import { getTranslation } from "@/lib/i18n";
import {
  Sparkles,
  TrendingUp,
  Music,
  Heart,
  Play,
  Star,
  Library,
  Search,
  BookOpen,
  Users,
  Radio,
  Calendar,
  Mic,
  Wand2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "trending", label: "Latest", color: "from-orange-500 to-red-500" },
  { id: "vitthal", label: "Vitthal", color: "from-blue-500 to-indigo-500" },
  { id: "shiva", label: "Shiva", color: "from-purple-500 to-blue-500" },
  { id: "ganesha", label: "Ganesha", color: "from-pink-500 to-orange-500" },
  { id: "ram", label: "Ram", color: "from-orange-400 to-yellow-600" },
  { id: "aarti", label: "Aarti", color: "from-yellow-400 to-orange-400" },
];

const moodCategories = [
  {
    title: "Morning Bhakti",
    description: "Soft chants for sunrise focus",
    tag: "Sunrise",
  },
  {
    title: "Evening Aarti",
    description: "Temple-inspired evening rituals",
    tag: "Twilight",
  },
  {
    title: "Meditation",
    description: "Slow ragas and calm vocals",
    tag: "Stillness",
  },
  {
    title: "Devotion",
    description: "High-energy kirtans and bhajans",
    tag: "Bhakti",
  },
  {
    title: "Stress Relief",
    description: "Breathing guides with music",
    tag: "Calm",
  },
];

const pillars = [
  {
    title: "streamTitle",
    description: "streamDesc",
    icon: Music,
  },
  {
    title: "learnTitle",
    description: "learnDesc",
    icon: BookOpen,
  },
  {
    title: "createTitle",
    description: "createDesc",
    icon: Mic,
  },
];

const kirtankars = [
  {
    name: "Nitin Maharaj Bangar",
    style: "Varkari Kirtan",
    followers: "142k",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Shriya Gokhale",
    style: "Abhang and Bhajan",
    followers: "98k",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Aarav Pandit",
    style: "Harmonium Lead",
    followers: "76k",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Meera Kulkarni",
    style: "Meditative Bhakti",
    followers: "61k",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
  },
];

const templePlaylists = [
  {
    title: "Pandharpur Wari",
    description: "Vitthal abhangs for the spiritual journey.",
  },
  {
    title: "Kashi Vishwanath",
    description: "Shiva stotras and aarti from Varanasi.",
  },
  {
    title: "Tirupati Darshan",
    description: "Venkateswara chants with temple percussion.",
  },
];

const liveEvents = [
  {
    title: "Live Kirtan from Pandharpur",
    host: "Swargiri Live",
    time: "Today 7:30 PM",
    type: "Live Stream",
  },
  {
    title: "Hanuman Chalisa Marathon",
    host: "Bhakti Studio",
    time: "Friday 6:00 AM",
    type: "Community Event",
  },
  {
    title: "Raga Bhairav Sunrise Aarti",
    host: "Temple Network",
    time: "Sunday 5:30 AM",
    type: "Temple Stream",
  },
];

const ragaFilters = {
  raga: ["Yaman", "Bhairav", "Bhairavi", "Darbari", "Bageshri"],
  taal: ["Teentaal", "Keharwa", "Dadra", "Rupak"],
  tempo: ["Vilambit", "Madhya", "Drut"],
  instrument: ["Harmonium", "Tabla", "Mridang", "Kartal"],
};

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("trending");
  const [videos, setVideos] = useState<VideoResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoResult | null>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentLang, setCurrentLang] = useState("en");

  const fetchVideos = async (query: string, isSearch: boolean = false) => {
    setIsLoading(true);
    setIsSearchActive(isSearch);
    setSearchQuery(query);
    const results = await searchYouTubeVideos(query);
    setVideos(results);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isSearchActive) {
      fetchVideos(activeCategory);
    }
  }, [activeCategory, isSearchActive]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("swargiri_lang") || "en";
      setCurrentLang(savedLang);

      const handleLanguageChange = () => {
        const lang = localStorage.getItem("swargiri_lang") || "en";
        setCurrentLang(lang);
      };

      window.addEventListener("languageChanged", handleLanguageChange);
      return () => window.removeEventListener("languageChanged", handleLanguageChange);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="mx-auto w-24 h-24 md:w-28 md:h-28">
              <LottieLotus />
            </div>
            <div className="flex items-center gap-3 px-6 py-2 rounded-full glass border-primary-purple/20 text-xs font-black tracking-[0.3em] uppercase text-primary-purple mb-8">
              <Sparkles className="h-4 w-4" />
              {getTranslation(currentLang, "hero", "tag")}
            </div>

            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-tight italic">
              {getTranslation(currentLang, "hero", "title1")}<span className="text-saffron">{getTranslation(currentLang, "hero", "title2")}</span>
            </h1>

            <p className="text-xl md:text-2xl text-foreground/40 max-w-2xl mx-auto leading-relaxed font-light mb-12">
              {getTranslation(currentLang, "hero", "subtitle")}
            </p>

            <SearchBar onSearch={(q) => fetchVideos(q, true)} isLoading={isLoading} />
          </motion.div>
        </div>
      </section>

      {/* Platform Pillars */}
      <section className="py-14 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="glass p-8 rounded-[2.5rem] border-none space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-saffron/10 text-saffron flex items-center justify-center">
                <pillar.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight italic">{pillar.title}</h3>
              <p className="text-sm text-foreground/40 font-light italic">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mood Categories */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] font-black text-foreground/40 mb-6 flex-wrap">
            <Wand2 className="h-4 w-4 text-saffron shrink-0" />
            Mood Based Categories
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {moodCategories.map((mood) => (
              <div key={mood.title} className="glass p-6 rounded-[2rem] border-none space-y-3">
                <div className="text-[10px] uppercase tracking-[0.3em] font-black text-saffron">{mood.tag}</div>
                <h3 className="text-lg font-black italic uppercase tracking-tight">{mood.title}</h3>
                <p className="text-xs text-foreground/40 font-light italic">{mood.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="sticky top-20 z-40 bg-background/60 backdrop-blur-xl py-6 px-6 border-y border-foreground/5 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-foreground/40 font-bold uppercase text-[10px] tracking-[0.2em]">
            <Library className="h-4 w-4" />
            {isSearchActive ? "Search Results" : "Select Collection"}
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {isSearchActive ? (
              <button
                onClick={() => setIsSearchActive(false)}
                className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-primary-purple hover:bg-white/10 transition-all transform hover:scale-105"
              >
                <Library className="h-4 w-4" />
                Back to Collections
              </button>
            ) : (
              categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-500 transform hover:scale-110 active:scale-95 border-2",
                    activeCategory === cat.id
                      ? "bg-saffron text-stone-950 border-transparent shadow-[0_10px_30px_rgba(255,153,51,0.3)]"
                      : "glass border-foreground/5 text-foreground/40 hover:border-foreground/20"
                  )}
                >
                  {cat.label}
                </button>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Content Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="flex items-center gap-6 mb-16 px-4">
          <div className="p-4 rounded-3xl bg-primary-purple shadow-xl shadow-primary-purple/20">
            {isSearchActive ? <Search className="text-white h-7 w-7" /> : <TrendingUp className="text-white h-7 w-7" />}
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none mb-1 flex-wrap">
              {isSearchActive ? (
                <>Found <span className="text-gradient hover:break-all">"{searchQuery}"</span></>
              ) : (
                <>Top <span className="text-gradient">{activeCategory}</span></>
              )}
            </h2>
            <p className="text-sm text-foreground/30 font-bold tracking-widest uppercase italic">
              {isSearchActive ? "Showing results for your search" : "The essence of devotion."}
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-video glass rounded-[2.5rem] animate-pulse" />
            ))}
          </div>
        ) : (
          <VideoGrid videos={videos} onVideoClick={setSelectedVideo} />
        )}
      </section>

      {/* Popular Kirtankars */}
      <section className="py-24 px-6 bg-foreground/[0.02] border-y border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 rounded-2xl bg-saffron/10 text-saffron shrink-0">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tight">Popular Kirtankars</h2>
              <p className="text-sm text-foreground/40 uppercase tracking-widest font-bold">Follow and learn from leading voices</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kirtankars.map((artist) => (
              <div key={artist.name} className="glass rounded-[2.5rem] overflow-hidden border-none group">
                <div className="relative h-48">
                  <img src={artist.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={artist.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-black uppercase tracking-tight italic">{artist.name}</h3>
                  <p className="text-xs text-foreground/40 uppercase tracking-widest font-bold">{artist.style}</p>
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-foreground/40">
                    <span>{artist.followers} followers</span>
                    <button className="text-saffron hover:underline">Follow</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Temple Traditions */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] font-black text-foreground/40 flex-wrap">
              <Music className="h-4 w-4 text-saffron shrink-0" />
              Temple Traditions
            </div>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tight">
              Playlists Inspired by Sacred Spaces
            </h2>
            <p className="text-lg text-foreground/40 font-light italic">
              Curated collections rooted in devotional traditions from across India.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/" className="px-8 py-4 rounded-3xl bg-saffron text-stone-950 font-black uppercase tracking-widest text-center flex-1 sm:flex-none">
                Explore Playlists
              </Link>
              <Link href="/learn" className="px-8 py-4 rounded-3xl border border-foreground/10 font-black uppercase tracking-widest text-foreground/60 hover:bg-white/5 text-center flex-1 sm:flex-none">
                Learn the Ragas
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            {templePlaylists.map((playlist) => (
              <div key={playlist.title} className="glass p-6 rounded-[2.5rem] border-none flex items-center gap-6">
                <div className="h-14 w-14 rounded-2xl bg-saffron/10 text-saffron flex items-center justify-center shrink-0">
                  <Play className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase italic tracking-tight">{playlist.title}</h3>
                  <p className="text-sm text-foreground/40 font-light italic">{playlist.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Raga Based Search */}
      <section className="py-24 px-6 bg-foreground/[0.02] border-y border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl bg-primary-purple/10 text-primary-purple shrink-0">
              <Radio className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tight">Raga Based Search</h2>
              <p className="text-sm text-foreground/40 uppercase tracking-widest font-bold">Filter by raga, taal, tempo, instrument</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Object.entries(ragaFilters).map(([label, items]) => (
              <div key={label} className="glass p-6 rounded-[2.5rem] border-none space-y-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-foreground/50">{label}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span key={item} className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/5">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Events */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 rounded-2xl bg-marigold/10 text-marigold shrink-0">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tight">Live Kirtan Events</h2>
              <p className="text-sm text-foreground/40 uppercase tracking-widest font-bold">Join streaming sessions and temple events</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {liveEvents.map((event) => (
              <div key={event.title} className="glass p-6 rounded-[2.5rem] border-none space-y-4">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-black">
                  <span>{event.type}</span>
                  <span className="text-saffron">Live</span>
                </div>
                <h3 className="text-lg font-black uppercase italic tracking-tight">{event.title}</h3>
                <p className="text-xs text-foreground/40 font-bold uppercase tracking-widest">{event.host}</p>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-sm font-bold text-foreground/60">{event.time}</span>
                  <button className="text-xs font-black uppercase tracking-widest text-saffron hover:underline">Set Reminder</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning and Creator CTA */}
      <section className="py-24 px-6 bg-foreground/[0.02] border-y border-foreground/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass p-10 rounded-[3rem] border-none space-y-6">
            <div className="h-12 w-12 rounded-2xl bg-saffron/10 text-saffron flex items-center justify-center">
              <BookOpen className="h-6 w-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tight">Swargiri Academy</h2>
            <p className="text-base text-foreground/40 font-light italic">
              Courses for kirtan training, harmonium, tabla, mridang, kartal, and devotional music theory.
            </p>
            <Link href="/learn" className="inline-flex px-8 py-4 rounded-3xl bg-saffron text-stone-950 font-black uppercase tracking-widest text-center">
              Browse Courses
            </Link>
          </div>
          <div className="glass p-10 rounded-[3rem] border-none space-y-6">
            <div className="h-12 w-12 rounded-2xl bg-primary-purple/10 text-primary-purple flex items-center justify-center">
              <Mic className="h-6 w-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tight">Creator Dashboard</h2>
            <p className="text-base text-foreground/40 font-light italic">
              Upload bhajans, kirtans, pravachans, manage lyrics, and track analytics in real time.
            </p>
            <Link href="/dashboard" className="inline-flex px-8 py-4 rounded-3xl border border-foreground/10 font-black uppercase tracking-widest text-foreground/60 hover:bg-white/5 text-center">
              Open Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Stress Relief */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] font-black text-foreground/40 flex-wrap">
              <Heart className="h-4 w-4 text-saffron shrink-0" />
              Stress Relief Mode
            </div>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tight">Meditation and Calm</h2>
            <p className="text-lg text-foreground/40 font-light italic">
              Meditation bhajans, instrumental devotionals, and guided breathing for mental wellness.
            </p>
            <Link href="/calm" className="inline-flex px-8 py-4 rounded-3xl bg-saffron text-stone-950 font-black uppercase tracking-widest text-center flex-wrap">
              Enter Calm Mode
            </Link>
          </div>
          <div className="glass p-10 rounded-[3rem] border-none space-y-6 flex flex-col items-start w-full">
            <div className="flex items-center justify-between w-full">
              <span className="text-xs uppercase tracking-[0.3em] font-black text-foreground/40">Featured Session</span>
              <Star className="h-5 w-5 text-marigold" />
            </div>
            <h3 className="text-2xl font-black uppercase italic tracking-tight">10-Minute Relaxation Playlist</h3>
            <p className="text-sm text-foreground/40 font-light italic">
              Gentle ragas with a guided breath timer to support teams and individuals.
            </p>
            <button className="px-8 py-4 rounded-3xl border border-foreground/10 font-black uppercase tracking-widest text-foreground/60 hover:bg-white/5 flex-wrap">
              Add to Library
            </button>
          </div>
        </div>
      </section>

      <MoodGenerator />
      <SpiritualQuote />

      {/* About Us */}
      <section id="about" className="py-28 px-6 bg-foreground/[0.02] border-y border-foreground/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] font-black text-foreground/40 flex-wrap">
              <Sparkles className="h-4 w-4 text-saffron shrink-0" />
              About Swargiri
            </div>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tight">
              A Digital Sanctuary for Devotion
            </h2>
            <p className="text-lg text-foreground/40 font-light italic">
              Swargiri is built to preserve sacred traditions while delivering a premium modern experience for
              devotional music. We combine streaming, learning, and community to help listeners find peace,
              creators grow their impact, and students master the art of bhakti.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/about"
                className="px-8 py-4 rounded-3xl bg-saffron text-stone-950 font-black uppercase tracking-widest flex-1 sm:flex-none text-center"
              >
                Learn More
              </Link>
              <Link
                href="/dashboard"
                className="px-8 py-4 rounded-3xl border border-foreground/10 font-black uppercase tracking-widest text-foreground/60 hover:bg-white/5 flex-1 sm:flex-none text-center"
              >
                Creator Hub
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Mission",
                description: "Elevate devotion with high-quality kirtans, bhajans, and learning paths.",
              },
              {
                title: "Culture",
                description: "Celebrate regional traditions, temple rituals, and classical raga heritage.",
              },
              {
                title: "Impact",
                description: "Support inner calm through mindful listening and stress relief journeys.",
              },
              {
                title: "Community",
                description: "Connect seekers, students, and kirtankars through live events and dialogue.",
              },
            ].map((item) => (
              <div key={item.title} className="glass p-6 rounded-[2.5rem] border-none space-y-3">
                <div className="text-[10px] uppercase tracking-[0.3em] font-black text-saffron">
                  {item.title}
                </div>
                <p className="text-sm text-foreground/40 font-light italic">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promise Section */}
      <section className="py-40 px-6 flex justify-center">
        <div className="glass p-10 md:p-16 max-w-4xl text-center rounded-[3rem] md:rounded-[5rem] border-none shadow-[0_0_150px_rgba(255,153,51,0.1)] relative w-full">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 p-6 bg-gradient-to-br from-saffron to-marigold rounded-[2rem] shadow-2xl">
            <Heart className="h-10 w-10 text-stone-950 fill-stone-950 animate-bounce" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 italic">Pure Devotion. <br className="md:hidden" /><span className="text-saffron">Zero Effort.</span></h2>
          <p className="text-lg md:text-2xl text-foreground/40 leading-relaxed max-w-2xl mx-auto font-light mb-12 italic">
            "We believe spiritual music should be accessible to everyone, everywhere. No ads, no signups, just the melody of the soul."
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-4 group">
              <div className="h-12 w-12 rounded-2xl glass flex items-center justify-center group-hover:bg-saffron/20 transition-all shrink-0">
                <Play className="h-6 w-6 text-saffron" />
              </div>
              <span className="text-sm font-black uppercase tracking-widest">Instant Play</span>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="h-12 w-12 rounded-2xl glass flex items-center justify-center group-hover:bg-marigold/20 transition-all shrink-0">
                <Star className="h-6 w-6 text-marigold" />
              </div>
              <span className="text-sm font-black uppercase tracking-widest">Premium HD</span>
            </div>
          </div>
        </div>
      </section>

      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </div>
  );
}
