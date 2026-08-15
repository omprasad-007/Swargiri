"use client";

import React, { useState } from "react";
import { Sparkles, X, Send, Play, CheckCircle2, Music } from "lucide-react";
import { useAudioPlayer } from "../context/AudioPlayerContext";

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const { playSong } = useAudioPlayer();

  if (!isOpen) return null;

  const examplePrompts = [
    "Give me peaceful Marathi songs from the 1990s",
    "Show me energetic Tabla and Sitar instrumental tracks",
    "Find meditative Bhajans for morning reflection",
    "Lo-fi beats from 2020s for deep focus"
  ];

  const handleSubmit = async (userPrompt: string) => {
    if (!userPrompt.trim()) return;
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userPrompt })
      });
      const data = await res.json();
      if (data.success) {
        setResponse(data.data);
      }
    } catch (err) {
      console.warn("AI assistant error:", err);
      // Fallback demo response if backend is offline
      setResponse({
        userPrompt,
        validatedFilters: { language: "Marathi", era: "1990s", mood: "Peaceful" },
        count: 2,
        songs: [
          {
            id: "ai-demo-1",
            title: "Ghan Nila Guntala",
            artist: "Lata Mangeshkar",
            album: "Classic 90s Marathi",
            genre: "Regional",
            language: "Marathi",
            era: "1990s",
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600",
            duration: 240
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#131313] border border-[#f2ca50]/30 rounded-2xl p-6 text-white shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-[#d4af37] to-[#f2ca50] text-black">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-heading text-white">AI Music Assistant</h2>
              <p className="text-xs text-[#d0c5af]">Safe Natural Language Filter Conversion Engine</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Example Prompt Chips */}
        <div className="mb-4">
          <p className="text-xs text-[#d0c5af] mb-2 font-medium">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((ex, i) => (
              <button
                key={i}
                onClick={() => {
                  setPrompt(ex);
                  handleSubmit(ex);
                }}
                className="text-xs px-3 py-1.5 rounded-full bg-[#201f1f] hover:bg-[#d4af37]/20 border border-white/10 hover:border-[#f2ca50]/40 text-gray-300 hover:text-[#f2ca50] transition"
              >
                "{ex}"
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(prompt);
          }}
          className="flex items-center gap-2 mb-6"
        >
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Give me peaceful Marathi songs from the 1990s..."
            className="flex-1 bg-[#201f1f] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#f2ca50]"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-black font-semibold text-sm hover:opacity-90 transition flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Sparkles className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Ask AI
          </button>
        </form>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
          {response && (
            <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
              {/* Validated Filters Badge */}
              <div className="p-3 rounded-xl bg-[#201f1f] border border-[#f2ca50]/20 text-xs">
                <div className="flex items-center gap-2 font-semibold text-[#f2ca50] mb-1">
                  <CheckCircle2 className="w-4 h-4" /> Validated Structured Search Filters:
                </div>
                <div className="flex flex-wrap gap-2 text-gray-300 mt-2">
                  {Object.entries(response.validatedFilters || {}).map(([key, val]) => (
                    <span key={key} className="px-2 py-0.5 rounded bg-black/40 border border-white/10">
                      {key}: <strong className="text-white">{String(val)}</strong>
                    </span>
                  ))}
                </div>
              </div>

              {/* Matched Songs */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                  Matched Catalog Results ({response.count || 0})
                </h4>
                {response.songs && response.songs.length > 0 ? (
                  response.songs.map((song: any, index: number) => (
                    <div
                      key={song.id || index}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#1c1b1b] hover:bg-[#201f1f] border border-white/5 hover:border-[#f2ca50]/30 transition group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={song.coverImage || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100"}
                          alt={song.title}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="text-sm font-semibold text-white group-hover:text-[#f2ca50] transition">
                            {song.title}
                          </p>
                          <p className="text-xs text-gray-400">
                            {song.artist} • {song.genre} ({song.era || "Classic"})
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => playSong(song)}
                        className="p-2.5 rounded-full bg-[#f2ca50] text-black hover:scale-105 transition"
                      >
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 italic">No songs matched these criteria in catalog.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
