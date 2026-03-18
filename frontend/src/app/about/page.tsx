"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import Link from "next/link";
import { BackButton } from "@/components/BackButton";

const teamValues = [
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
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto w-full">
        <BackButton label="Back to Home" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="text-center space-y-6 mb-20 space-x-4">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass border-saffron/20 text-xs font-black tracking-[0.3em] uppercase text-saffron mb-4">
              <Sparkles className="h-4 w-4" />
              About Swargiri
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tight">
              A Digital Sanctuary <br className="hidden md:block" />
              <span className="text-saffron">For Devotion</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/50 font-light italic max-w-2xl mx-auto">
              Swargiri is built to preserve sacred traditions while delivering a premium modern experience for
              devotional music. We combine streaming, learning, and community to help listeners find peace,
              creators grow their impact, and students master the art of bhakti.
            </p>
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-20">
            {teamValues.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-[2.5rem] border-none space-y-4"
              >
                <div className="h-12 w-12 rounded-2xl bg-saffron/10 text-saffron flex items-center justify-center">
                  <span className="text-xl font-black">{i + 1}</span>
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight italic">{item.title}</h3>
                <p className="text-base text-foreground/50 font-light italic leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Journey Section */}
          <div className="glass p-10 md:p-16 rounded-[3rem] border-none text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-saffron/10 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-purple/10 blur-[100px] rounded-full" />
            
            <div className="relative z-10 space-y-8">
              <Heart className="h-12 w-12 text-saffron mx-auto" />
              <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tight">Our Promise</h2>
              <p className="text-lg text-foreground/50 italic max-w-2xl mx-auto leading-relaxed">
                "We believe spiritual music should be accessible to everyone, everywhere. 
                Our platform bridges the gap between ancient traditions and modern technology, 
                ensuring that the melody of the soul is never lost."
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link
                  href="/learn"
                  className="px-8 py-4 rounded-3xl bg-saffron text-stone-950 font-black uppercase tracking-widest text-sm"
                >
                  Explore Academy
                </Link>
                <Link
                  href="/dashboard"
                  className="px-8 py-4 rounded-3xl border border-foreground/10 font-black uppercase tracking-widest text-foreground/60 hover:bg-white/5 text-sm"
                >
                  Join as Creator
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
