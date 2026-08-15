"use client";

import { motion } from "framer-motion";
import { Play, Pause, Heart, Share2, Music2 } from "lucide-react";
import { useState } from "react";

const TRACKS = {
  vitthal: [
    { title: "Majhe Maher Pandhari", artist: "Pt. Bhimsen Joshi", duration: "6:45" },
    { title: "Roop Pahata Lochani", artist: "Lata Mangeshkar", duration: "5:20" },
    { title: "Avagha Rang Ek Zala", artist: "Kishori Amonkar", duration: "8:15" },
  ],
  krishna: [
    { title: "Achyutam Keshavam", artist: "Traditional", duration: "5:30" },
    { title: "Govind Bolo Hari", artist: "Chorus", duration: "4:15" },
    { title: "Shri Krishna Govind Hare Murari", artist: "Jagjit Singh", duration: "7:00" },
  ],
  shiv: [
    { title: "Shiv Tandav Stotram", artist: "Traditional", duration: "9:20" },
    { title: "Om Namah Shivaya", artist: "Suresh Wadkar", duration: "12:00" },
    { title: "Karpur Gauram", artist: "Chorus", duration: "3:45" },
  ],
  ram: [
    { title: "Shri Ram Chandra Kripalu", artist: "Jagjit Singh", duration: "6:10" },
    { title: "Mangal Bhavan Amangal Hari", artist: "Ravindra Jain", duration: "14:20" },
    { title: "Raghupati Raghav Raja Ram", artist: "Traditional", duration: "5:00" },
  ]
};

const METADATA = {
  vitthal: { title: "Vitthal Bhajans", god: "Lord Vitthal", color: "from-orange-500 to-amber-500", img: "bg-orange-900" },
  krishna: { title: "Krishna Bhajans", god: "Lord Krishna", color: "from-blue-500 to-indigo-500", img: "bg-blue-900" },
  shiv: { title: "Shiv Bhajans", god: "Lord Shiva", color: "from-slate-600 to-slate-800", img: "bg-slate-900" },
  ram: { title: "Ram Bhajans", god: "Lord Ram", color: "from-saffron to-marigold", img: "bg-orange-800" }
};

export default function GodBhajanPage({ params }: { params: { god: string } }) {
  const [playing, setPlaying] = useState<number | null>(null);
  
  const godId = params.god as keyof typeof METADATA;
  const data = METADATA[godId] || METADATA.vitthal;
  const tracks = TRACKS[godId] || TRACKS.vitthal;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-end mb-12">
          <div className={`w-48 h-48 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-white bg-gradient-to-br ${data.color}`}>
            <Music2 className="w-16 h-16 mb-4 opacity-50" />
            <span className="font-heading font-black text-xl text-center px-4 leading-tight">{data.title}</span>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/50 mb-2">Playlist • {data.god}</h4>
            <h1 className="text-5xl font-black mb-4 font-heading">{data.title}</h1>
            <div className="flex items-center gap-4">
              <button className={`px-8 py-3 rounded-full text-white font-bold tracking-wide shadow-lg bg-gradient-to-r ${data.color} hover:scale-105 transition-transform flex items-center gap-2`}>
                <Play className="w-5 h-5 fill-current" /> Play All
              </button>
              <button className="p-3 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-3 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-background/40 backdrop-blur-xl border border-foreground/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-[auto_1fr_auto] gap-4 p-4 border-b border-foreground/5 text-xs font-bold uppercase tracking-widest text-foreground/50">
            <div className="w-12 text-center">#</div>
            <div>Title</div>
            <div className="w-16 text-right">Time</div>
          </div>
          
          <div className="flex flex-col">
            {tracks.map((track, i) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={i}
                className="grid grid-cols-[auto_1fr_auto] gap-4 p-4 items-center hover:bg-foreground/5 transition-colors group cursor-pointer"
                onClick={() => setPlaying(playing === i ? null : i)}
              >
                <div className="w-12 text-center text-foreground/40 font-bold group-hover:hidden">
                  {playing === i ? <Music2 className="w-4 h-4 mx-auto animate-pulse text-amber-500" /> : i + 1}
                </div>
                <div className="w-12 text-center hidden group-hover:block text-foreground">
                  {playing === i ? <Pause className="w-4 h-4 mx-auto fill-current" /> : <Play className="w-4 h-4 mx-auto fill-current" />}
                </div>
                
                <div className="flex flex-col">
                  <span className={`font-bold ${playing === i ? 'text-amber-500' : 'text-foreground'}`}>{track.title}</span>
                  <span className="text-sm text-foreground/60">{track.artist}</span>
                </div>
                
                <div className="w-16 text-right text-sm text-foreground/50 font-medium">
                  {track.duration}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
