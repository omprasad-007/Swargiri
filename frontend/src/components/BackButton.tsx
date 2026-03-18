"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface BackButtonProps {
  label?: string;
}

export function BackButton({ label = "Back" }: BackButtonProps) {
  const router = useRouter();

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      onClick={() => router.back()}
      className="group flex items-center gap-2 px-6 py-2.5 rounded-full glass border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all mb-8 shadow-lg"
    >
      <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
      <span className="text-xs font-black uppercase tracking-widest leading-none">{label}</span>
      
      {/* Subtle indicator */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500 -z-10" />
    </motion.button>
  );
}
