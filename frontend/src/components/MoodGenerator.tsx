"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Zap, Moon, Sun } from "lucide-react";

const moods = [
  { id: "peace", label: "Peace", icon: Moon, color: "text-blue-400" },
  { id: "devotion", label: "Devotion", icon: Heart, color: "text-saffron" },
  { id: "meditation", label: "Meditation", icon: Sun, color: "text-marigold" },
  { id: "energy", label: "Energy", icon: Zap, color: "text-orange-500" },
];

export function MoodGenerator() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12 text-center">
        <div className="space-y-4">
           <div className="flex items-center justify-center gap-2 text-saffron text-xs font-black uppercase tracking-[0.3em]">
             <Sparkles className="h-4 w-4" />
             AI Recommendations
           </div>
           <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
             How are you <span className="text-saffron">Feeling?</span>
           </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {moods.map((mood) => (
            <motion.button
              key={mood.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMood(mood.id)}
              className={`p-8 rounded-[2.5rem] glass transition-all border-none flex flex-col items-center gap-4 ${
                selectedMood === mood.id ? "bg-saffron/10 border-saffron shadow-2xl shadow-saffron/10" : ""
              }`}
            >
              <mood.icon className={`h-10 w-10 ${mood.color}`} />
              <span className="text-sm font-black uppercase tracking-widest">{mood.label}</span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {selectedMood && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="glass p-8 rounded-[3rem] border-none mt-12"
            >
              <p className="text-lg font-light italic">
                Suggesting {selectedMood} based melodies for your soul...
              </p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
                    <div className="w-12 h-12 rounded-lg bg-saffron/20" />
                    <div className="text-left">
                       <p className="text-sm font-black uppercase tracking-tighter">Divine {selectedMood} Chants</p>
                       <p className="text-[10px] text-foreground/40 font-bold uppercase">AI Generated Playlist</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
                    <div className="w-12 h-12 rounded-lg bg-marigold/20" />
                    <div className="text-left">
                       <p className="text-sm font-black uppercase tracking-tighter">{selectedMood} Radiance</p>
                       <p className="text-[10px] text-foreground/40 font-bold uppercase">Personalized for you</p>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
