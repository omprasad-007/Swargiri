"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wind, Moon, Play, RefreshCw } from "lucide-react";

export default function CalmPage() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathStage, setBreathStage] = useState("Inhale");
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isBreathing) {
      interval = setInterval(() => {
        setTimer((prev) => {
          const next = (prev + 1) % 12;
          if (next < 4) setBreathStage("Inhale");
          else if (next < 8) setBreathStage("Hold");
          else setBreathStage("Exhale");
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBreathing]);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-saffron/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center space-y-8 max-w-2xl"
      >
        <div className="space-y-4">
          <h1 className="text-5xl font-black tracking-tighter uppercase italic text-saffron">
            STRESS <span className="text-white">RELIEF</span>
          </h1>
          <p className="text-stone-400 italic font-light text-lg">
            Find your inner peace through divine melodies and conscious breathing.
          </p>
        </div>

        {/* Breathing Guide Visualizer */}
        <div className="relative h-80 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={breathStage}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: isBreathing ? (breathStage === "Inhale" ? 1.5 : breathStage === "Hold" ? 1.5 : 0.8) : 1,
                opacity: 1,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: breathStage === "Hold" ? 0 : 4, ease: "easeInOut" }}
              className="w-40 h-40 rounded-full border-4 border-saffron/30 flex items-center justify-center relative"
            >
              <div className="absolute inset-0 bg-saffron/20 rounded-full blur-xl" />
              <span className="text-xl font-black uppercase tracking-widest text-white z-10">
                {isBreathing ? breathStage : "Ready?"}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Particle orbits */}
          {isBreathing && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute w-64 h-64 border border-white/5 rounded-full"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-marigold rounded-full shadow-[0_0_10px_#ffc200]" />
            </motion.div>
          )}
        </div>

        <div className="flex flex-col items-center gap-6">
          <button
            onClick={() => setIsBreathing(!isBreathing)}
            className="px-12 py-4 rounded-full bg-saffron text-stone-950 font-black uppercase tracking-widest hover:bg-marigold transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-saffron/20"
          >
            {isBreathing ? "Pause Session" : "Start Breathing"}
          </button>
          <div className="text-xs uppercase tracking-[0.3em] text-foreground/40 font-black">
            Session {timer}s
          </div>

          <div className="flex gap-8">
            <div className="flex flex-col items-center gap-2">
              <div className="p-4 rounded-2xl glass hover:bg-white/10 cursor-pointer transition-all">
                <Wind className="h-6 w-6 text-saffron" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-tighter opacity-40">Air</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-4 rounded-2xl glass hover:bg-white/10 cursor-pointer transition-all">
                <Moon className="h-6 w-6 text-saffron" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-tighter opacity-40">Night</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-4 rounded-2xl glass hover:bg-white/10 cursor-pointer transition-all">
                <RefreshCw className="h-6 w-6 text-saffron" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-tighter opacity-40">Reset</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recommended Meditation Track */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed bottom-12 right-12 glass p-6 rounded-[2.5rem] w-80 border-none hidden lg:block"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-saffron to-marigold flex items-center justify-center shrink-0">
            <Play className="fill-stone-950 text-stone-950" />
          </div>
          <div className="min-w-0">
            <h4 className="font-black italic uppercase text-sm truncate">Evening Raag</h4>
            <p className="text-[10px] uppercase font-bold text-saffron tracking-widest">Meditation - 10m</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
