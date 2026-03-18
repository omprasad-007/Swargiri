"use client";

import React, { useState } from "react";
import { Search, Sparkles, Mic } from "lucide-react";
import { motion } from "framer-motion";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <motion.div
      id="search"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-3xl mx-auto px-4"
    >
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-saffron via-marigold to-saffron rounded-full blur opacity-20 group-focus-within:opacity-50 transition duration-1000"></div>
        
        <div className="relative flex items-center bg-stone-950/20 backdrop-blur-3xl border border-foreground/10 rounded-full overflow-hidden shadow-2xl">
          <div className="pl-6 text-saffron">
            <Search className="h-5 w-5" />
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Bhajans, Kirtans, or Ragas..."
            className="w-full py-5 px-6 bg-transparent text-foreground placeholder:text-foreground/30 focus:outline-none font-medium text-lg"
          />
          
          <div className="flex items-center gap-2 pr-2">
            <button
              type="button"
              className="p-3 text-saffron hover:bg-saffron/10 rounded-full transition-colors"
              onClick={() => alert("Voice search is coming soon!")}
            >
              <Mic className="h-5 w-5" />
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-saffron text-stone-950 rounded-full font-black uppercase tracking-widest shadow-lg shadow-saffron/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-5 w-5" />
                </motion.div>
              ) : (
                "Search"
              )}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
