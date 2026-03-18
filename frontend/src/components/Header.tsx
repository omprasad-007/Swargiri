"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full px-6 py-4 flex justify-center">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-pill px-8 py-3 flex justify-between items-center w-full max-w-6xl shadow-2xl bg-white/5"
      >
        <Link href="/" className="text-2xl font-black tracking-tighter text-white hover:text-primary transition-colors">
          SWAR<span className="text-primary italic">GAARI</span>
        </Link>
        
        <nav>
          <ul className="flex space-x-8 text-sm font-bold uppercase tracking-widest text-white/70">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            </li>
            <li>
              <Link href="/shiva" className="hover:text-primary transition-colors">Shiva</Link>
            </li>
            <li>
              <Link href="/ram" className="hover:text-primary transition-colors">Ram</Link>
            </li>
            <li>
              <Link href="/krishna" className="hover:text-primary transition-colors">Krishna</Link>
            </li>
          </ul>
        </nav>
      </motion.div>
    </header>
  );
}
