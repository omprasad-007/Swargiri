"use client";

import React, { useState } from "react";
import { Mic2, Play, Users, Heart, Bookmark, ListPlus, Upload, ShieldCheck, Plus, CheckCircle } from "lucide-react";

export default function ArtistDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "upload" | "tracks">("overview");

  const stats = [
    { title: "Monthly Listeners", val: "24,850", icon: Users, change: "+12.4%" },
    { title: "Total Track Plays", val: "184,200", icon: Play, change: "+18.2%" },
    { title: "Catalog Likes", val: "14,310", icon: Heart, change: "+8.7%" },
    { title: "User Saves & Additions", val: "6,920", icon: Bookmark, change: "+15.1%" }
  ];

  const tracks = [
    { title: "Shiv Tandav Stotram (Acoustic Raga Version)", plays: "48,200", saves: "3,120", status: "Approved", copyright: "Creator Authorized" },
    { title: "Morning Raga Yaman Sitar Solo", plays: "32,150", saves: "2,400", status: "Approved", copyright: "Licensed" },
    { title: "Lo-fi Abhang Chill Mix", plays: "12,900", saves: "890", status: "Pending Moderation", copyright: "Creator Authorized" }
  ];

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] py-12 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header matching Stitch screen */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#201f1f] border border-[#f2ca50]/30 text-xs text-[#f2ca50] font-semibold mb-3">
            <Mic2 className="w-4 h-4" />
            <span>Swargiri Creator & Artist Studio</span>
          </div>
          <h1 className="text-4xl font-extrabold font-heading text-white">Artist Dashboard</h1>
          <p className="text-sm text-[#d0c5af] mt-1">
            Manage your singles, albums, EPs, lyrics, credits, and view listener analytics.
          </p>
        </div>

        <button
          onClick={() => setActiveTab("upload")}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-black font-bold text-xs flex items-center gap-2 shadow-xl hover:scale-105 transition"
        >
          <Upload className="w-4 h-4" /> Upload New Track
        </button>
      </div>

      {/* Analytics Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="p-6 rounded-2xl bg-[#1c1b1b] border border-white/10 shadow-xl flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-medium">{s.title}</p>
                <h3 className="text-2xl font-bold font-heading text-white mt-1">{s.val}</h3>
                <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                  {s.change} this month
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#201f1f] text-[#f2ca50]">
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs Section */}
      <div className="bg-[#1c1b1b] border border-[#f2ca50]/20 rounded-2xl p-6 shadow-2xl">
        <div className="flex border-b border-white/10 pb-4 mb-6 gap-4">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-2 text-xs font-bold transition border-b-2 ${
              activeTab === "overview" ? "border-[#f2ca50] text-[#f2ca50]" : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Track Management & Catalog
          </button>
          <button
            onClick={() => setActiveTab("upload")}
            className={`pb-2 text-xs font-bold transition border-b-2 ${
              activeTab === "upload" ? "border-[#f2ca50] text-[#f2ca50]" : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Upload Track & Metadata
          </button>
        </div>

        {activeTab === "overview" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#d0c5af] mb-2">Uploaded Releases</h3>
            {tracks.map((t, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-[#201f1f] border border-white/5 gap-4"
              >
                <div>
                  <h4 className="text-base font-bold text-white">{t.title}</h4>
                  <p className="text-xs text-gray-400 mt-1">
                    {t.plays} Plays • {t.saves} Saves • Rights: <span className="text-[#f2ca50]">{t.copyright}</span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                      t.status === "Approved"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                    }`}
                  >
                    {t.status}
                  </span>
                  <button className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white">
                    Edit Metadata
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "upload" && (
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6 max-w-2xl">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#d0c5af] mb-1">Track Title</label>
                <input
                  type="text"
                  placeholder="e.g. Raag Bhairavi Evening Meditation"
                  className="w-full bg-[#201f1f] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#f2ca50]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#d0c5af] mb-1">Genre</label>
                  <select className="w-full bg-[#201f1f] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#f2ca50]">
                    <option>Devotional</option>
                    <option>Indian Classical</option>
                    <option>International</option>
                    <option>Folk</option>
                    <option>Pop</option>
                    <option>Rock</option>
                    <option>Lo-fi</option>
                    <option>Meditation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#d0c5af] mb-1">Era</label>
                  <select className="w-full bg-[#201f1f] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#f2ca50]">
                    <option>2020s</option>
                    <option>2010s</option>
                    <option>2000s</option>
                    <option>1990s</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#d0c5af] mb-1">Copyright Status</label>
                  <select className="w-full bg-[#201f1f] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#f2ca50]">
                    <option>Creator Authorized</option>
                    <option>Licensed</option>
                    <option>Public Domain</option>
                    <option>Creative Commons</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#d0c5af] mb-1">Audio File URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    className="w-full bg-[#201f1f] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#f2ca50]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#d0c5af] mb-1">Lyrics & Credits</label>
                <textarea
                  rows={4}
                  placeholder="Paste track lyrics and contributor credits..."
                  className="w-full bg-[#201f1f] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#f2ca50]"
                />
              </div>
            </div>

            <button
              type="submit"
              onClick={() => alert("Track metadata submitted for content moderation review!")}
              className="px-6 py-3 rounded-xl bg-[#f2ca50] text-black font-bold text-xs hover:scale-105 transition shadow-lg"
            >
              Submit Track For Moderation Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
