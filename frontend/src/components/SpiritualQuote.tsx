"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

const quotes = [
  { text: "The soul is neither born, and nor does it die.", author: "Lord Krishna" },
  { text: "Devotion is the shortest path to divine realization.", author: "Sant Tukaram" },
  { text: "Spread love and peace through the melody of your heart.", author: "Sant Dnyaneshwar" },
  { text: "When you play music for God, every note is a prayer.", author: "Mirabai" }
];

export function SpiritualQuote() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex justify-center py-20 px-6">
      <div className="glass p-12 max-w-3xl w-full text-center rounded-[3rem] border-none relative overflow-hidden group">
        <div className="absolute -top-6 -left-6 opacity-10 group-hover:rotate-12 transition-transform duration-500">
           <Quote className="h-32 w-32 text-saffron" />
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6 relative z-10"
          >
            <p className="text-2xl md:text-3xl font-light italic text-foreground/80 leading-relaxed italic">
              "{quotes[index].text}"
            </p>
            <div className="flex flex-col items-center gap-2">
               <div className="h-1 w-12 bg-saffron rounded-full" />
               <span className="text-xs font-black uppercase tracking-[0.3em] text-saffron">{quotes[index].author}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
