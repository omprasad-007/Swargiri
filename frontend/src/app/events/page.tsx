"use client";

import React, { useState } from "react";
import { Radio, Calendar, Bell, Play, CheckCircle } from "lucide-react";

export default function LiveEventsPage() {
  const [reminderSet, setReminderSet] = useState<Record<string, boolean>>({});

  const events = [
    {
      id: "ev-1",
      title: "Grand Evening Kirtan & Abhang Jugalbandi Live",
      artist: "Pandit Sanjeev Abhyankar",
      scheduledAt: "Today, 7:00 PM IST",
      provider: "YouTube Live",
      embedUrl: "https://www.youtube.com/embed/live_stream?channel=UCswargiri",
      status: "Live Now",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600"
    },
    {
      id: "ev-2",
      title: "Full Moon Raag Malhar Sitar Concert",
      artist: "Ustad Shahid Parvez",
      scheduledAt: "Tomorrow, 8:30 PM IST",
      provider: "HLS Stream",
      status: "Upcoming",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600"
    }
  ];

  const toggleReminder = (id: string) => {
    setReminderSet((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] py-12 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#201f1f] border border-[#f2ca50]/30 text-xs text-[#f2ca50] font-semibold mb-3">
          <Radio className="w-4 h-4" />
          <span>Live Music & Spiritual Concert Streams</span>
        </div>
        <h1 className="text-4xl font-extrabold font-heading text-white">Live Events</h1>
        <p className="text-sm text-[#d0c5af] mt-2 max-w-xl">
          Watch live performances, sacred kirtans, and streaming provider embeds in high fidelity.
        </p>
      </div>

      {/* Events List */}
      <div className="space-y-8 mb-16">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="p-6 rounded-2xl bg-[#1c1b1b] border border-white/10 hover:border-[#f2ca50]/30 transition shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
          >
            <div className="lg:col-span-5 relative h-56 rounded-xl overflow-hidden">
              <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
              <span
                className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] uppercase font-bold ${
                  ev.status === "Live Now" ? "bg-red-600 text-white animate-pulse" : "bg-black/60 text-[#f2ca50]"
                }`}
              >
                {ev.status}
              </span>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-2xl font-bold font-heading text-white">{ev.title}</h3>
              <p className="text-sm text-[#f2ca50] font-medium">{ev.artist}</p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-[#f2ca50]" /> {ev.scheduledAt}
                </span>
                <span>• Provider: {ev.provider}</span>
              </div>

              <div className="flex items-center gap-4 pt-2">
                {ev.status === "Live Now" ? (
                  <button className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg">
                    <Play className="w-4 h-4 fill-current ml-0.5" /> Watch Live Stream
                  </button>
                ) : (
                  <button
                    onClick={() => toggleReminder(ev.id)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                      reminderSet[ev.id]
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                        : "bg-[#f2ca50] text-black hover:scale-105"
                    }`}
                  >
                    {reminderSet[ev.id] ? (
                      <>
                        <CheckCircle className="w-4 h-4" /> Reminder Set
                      </>
                    ) : (
                      <>
                        <Bell className="w-4 h-4" /> Set Reminder
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
