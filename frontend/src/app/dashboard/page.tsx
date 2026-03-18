"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Upload, 
  Music, 
  Video, 
  Users, 
  MessageSquare, 
  Settings,
  Plus,
  Play
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { label: "Total Plays", value: "145.2k", change: "+12%", icon: BarChart3 },
    { label: "Followers", value: "12,840", change: "+5%", icon: Users },
    { label: "Engagement", value: "8.4%", change: "+2%", icon: MessageSquare },
  ];

  const recentUploads = [
    { title: "Evening Vitthal Aarti", type: "Audio", plays: "4.2k", date: "2 days ago" },
    { title: "Kirtan at Pandharpur", type: "Video", plays: "12.8k", date: "5 days ago" },
    { title: "Shiva Stotra Chants", type: "Audio", plays: "1.5k", date: "1 week ago" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-20 lg:w-72 bg-stone-950 border-r border-white/5 flex flex-col items-center lg:items-start py-12 px-6 space-y-12">
        <div className="text-2xl font-black italic tracking-tighter text-saffron hidden lg:block">
          SWARGIRI
        </div>
        
        <nav className="flex-1 w-full space-y-4">
          {[
            { label: "Overview", icon: BarChart3, active: true },
            { label: "My Content", icon: Music, active: false },
            { label: "Upload", icon: Upload, active: false },
            { label: "Community", icon: Users, active: false },
            { label: "Settings", icon: Settings, active: false },
          ].map((item) => (
            <div 
              key={item.label}
              className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${
                item.active ? "bg-saffron text-stone-950 font-black" : "text-stone-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="hidden lg:block uppercase text-xs tracking-widest">{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-12 space-y-12 overflow-y-auto">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">Creator <span className="text-saffron">Hub</span></h1>
            <p className="text-xs text-foreground/40 font-bold uppercase tracking-widest mt-2">Welcome back, Nitin Maharaj</p>
          </div>
          <button className="flex items-center gap-2 px-8 py-3 bg-saffron text-stone-950 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all">
            <Plus className="h-4 w-4" />
            New Upload
          </button>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-8 rounded-[2.5rem] border-none space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-2xl bg-saffron/10 text-saffron">
                  <stat.icon className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-black text-green-500 bg-green-500/10 px-2 py-1 rounded-full">{stat.change}</span>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase text-foreground/40 tracking-widest">{stat.label}</h3>
                <p className="text-3xl font-black mt-1 italic">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Content & Charts Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Recent Uploads */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter">Recent <span className="text-saffron">Content</span></h2>
            <div className="space-y-4">
              {recentUploads.map((item) => (
                <div key={item.title} className="glass p-6 rounded-3xl flex items-center justify-between border-none hover:bg-white/5 transition-all group">
                  <div className="flex items-center gap-6">
                    <div className="h-12 w-12 rounded-xl bg-stone-900 flex items-center justify-center group-hover:bg-saffron transition-colors">
                      {item.type === "Audio" ? <Music className="h-5 w-5 text-saffron group-hover:text-stone-950" /> : <Video className="h-5 w-5 text-saffron group-hover:text-stone-950" />}
                    </div>
                    <div>
                      <h4 className="font-black italic uppercase text-sm">{item.title}</h4>
                      <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">{item.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black italic">{item.plays}</p>
                    <p className="text-[10px] text-foreground/30 uppercase font-black">Plays</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Analytics Preview */}
          <section className="glass p-10 rounded-[3rem] border-none flex flex-col justify-center items-center space-y-6 text-center">
             <div className="w-20 h-20 rounded-full border-4 border-marigold/20 border-t-marigold animate-spin" />
             <div className="space-y-2">
                <h3 className="text-xl font-black italic uppercase tracking-tighter">Live Analytics</h3>
                <p className="text-xs text-foreground/40 font-light italic">Detailed insights for your latest kirtan are being generated...</p>
             </div>
             <button className="text-xs font-black uppercase tracking-widest text-saffron hover:underline">View Full Report</button>
          </section>
        </div>
      </main>
    </div>
  );
}
