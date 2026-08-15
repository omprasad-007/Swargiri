"use client";

import React, { useState } from "react";
import { Flame, Mic2, Plus, ShieldCheck, Heart, Users, BookOpen } from "lucide-react";

export default function KirtankarDashboardPage() {
  const [activeGod, setActiveGod] = useState<string>("All");

  const godsList = ["All", "Vitthal", "Krishna", "Shiva", "Ram", "Ganesh", "Hanuman", "Devi"];
  const categoriesList = ["Bhajan", "Kirtan", "Abhang", "Aarti", "Mantra", "Pravachan"];

  const discourses = [
    {
      title: "Vitthal Bhakti Abhang & Sampradaya Mahatmya",
      god: "Vitthal",
      category: "Abhang",
      temple: "Pandharpur Varkari Sampradaya",
      raga: "Kafi",
      taal: "Bhajani",
      language: "Marathi",
      region: "Maharashtra",
      listeners: "18,400"
    },
    {
      title: "Shiv Mahimna Stotram & Raga Bhairavi Pravachan",
      god: "Shiva",
      category: "Pravachan",
      temple: "Kashi Vishwanath Tradition",
      raga: "Bhairavi",
      taal: "Keherwa",
      language: "Sanskrit",
      region: "Varanasi",
      listeners: "24,100"
    }
  ];

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] py-12 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#201f1f] border border-[#f2ca50]/30 text-xs text-[#f2ca50] font-semibold mb-3">
            <Flame className="w-4 h-4" />
            <span>Kirtankar & Devotional Creator Hub</span>
          </div>
          <h1 className="text-4xl font-extrabold font-heading text-white">Kirtankar Studio</h1>
          <p className="text-sm text-[#d0c5af] mt-1">
            Publish Bhajans, Kirtans, Abhangs, Aartis, Mantras & Pravachans with Temple/Tradition, Raga & Taal tagging.
          </p>
        </div>

        <button className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-black font-bold text-xs flex items-center gap-2 shadow-xl hover:scale-105 transition">
          <Plus className="w-4 h-4" /> Create Devotional Discourse
        </button>
      </div>

      {/* Primary God Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8">
        {godsList.map((god) => (
          <button
            key={god}
            onClick={() => setActiveGod(god)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition border ${
              activeGod === god
                ? "bg-[#f2ca50] text-black border-transparent shadow-lg font-bold"
                : "bg-[#1c1b1b] text-gray-300 border-white/10 hover:border-[#f2ca50]/40 hover:text-white"
            }`}
          >
            {god}
          </button>
        ))}
      </div>

      {/* Discourses List */}
      <div className="space-y-4 mb-12">
        {discourses.map((d, i) => (
          <div key={i} className="p-6 rounded-2xl bg-[#1c1b1b] border border-white/10 hover:border-[#f2ca50]/30 transition shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded bg-[#f2ca50] text-black text-[10px] font-bold uppercase">
                  {d.category}
                </span>
                <span className="text-xs text-[#d0c5af] font-medium">Deity: {d.god}</span>
                <span className="text-xs text-gray-500">• {d.temple}</span>
              </div>
              <h3 className="text-lg font-bold text-white">{d.title}</h3>
              <p className="text-xs text-gray-400 mt-1">
                Raga: {d.raga} • Taal: {d.taal} • Language: {d.language} ({d.region})
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#d0c5af] font-semibold">{d.listeners} Listeners</span>
              <button className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white">
                Manage Discourse
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
