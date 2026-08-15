"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Music2, Play } from "lucide-react";

const BHAJAN_CATEGORIES = [
  { id: "vitthal", title: "Vitthal Bhajan", desc: "Soulful abhangs from Pandharpur", god: "Lord Vitthal", color: "from-orange-500 to-amber-500" },
  { id: "krishna", title: "Krishna Bhajan", desc: "Melodious tunes of Vrindavan", god: "Lord Krishna", color: "from-blue-500 to-indigo-500" },
  { id: "shiv", title: "Shiv Bhajan", desc: "Powerful chants from Kailash", god: "Lord Shiva", color: "from-slate-600 to-slate-800" },
  { id: "ram", title: "Ram Bhajan", desc: "Devotional songs from Ayodhya", god: "Lord Ram", color: "from-saffron to-marigold" },
];

export default function BhajansPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-[10%] right-[10%] w-[40rem] h-[40rem] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-2xl shadow-xl shadow-orange-500/20 mb-6">
            <Music2 className="h-10 w-10" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 font-heading">Divine Bhajans</h1>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto italic">
            "Immerse yourself in the ocean of devotion with our curated collection of soulful bhajans."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BHAJAN_CATEGORIES.map((category, i) => (
            <Link href={`/bhajans/${category.id}`} key={category.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group w-full h-full bg-background/50 backdrop-blur-xl border border-foreground/5 rounded-3xl p-6 relative overflow-hidden cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 shadow-lg transform group-hover:-rotate-6 transition-transform`}>
                  <Music2 className="text-white h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black mb-2 font-heading tracking-tight">{category.title}</h3>
                <p className="text-foreground/60 text-sm mb-6">{category.desc}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs font-bold uppercase tracking-widest text-foreground/40">{category.god}</span>
                  <div className={`w-10 h-10 rounded-full bg-background flex items-center justify-center shadow-md text-foreground/40 group-hover:text-amber-500 group-hover:bg-amber-50 transition-colors`}>
                    <Play className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
