"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Search, Music, GraduationCap, Mic2, Radio, Building2, UserCheck, Menu, X, ShieldAlert } from "lucide-react";
import { AIAssistantModal } from "./AIAssistantModal";

export const Navbar: React.FC = () => {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<string>("USER");
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const rolesList = [
    { id: "USER", label: "Casual Listener", icon: Music },
    { id: "STUDENT", label: "Music Student", icon: GraduationCap },
    { id: "ARTIST", label: "Artist Creator", icon: Mic2 },
    { id: "KIRTANKAR", label: "Kirtankar / Sacred", icon: Mic2 },
    { id: "INSTRUCTOR", label: "Academy Instructor", icon: GraduationCap },
    { id: "ORGANIZATION_ADMIN", label: "Corporate Wellness Admin", icon: Building2 },
    { id: "ADMIN", label: "Platform Admin", icon: ShieldAlert }
  ];

  return (
    <>
      <nav className="sticky top-0 z-40 bg-[#131313]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 text-white transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#d4af37] via-[#f2ca50] to-[#ffe088] p-0.5 shadow-lg group-hover:scale-105 transition">
              <div className="w-full h-full bg-[#131313] rounded-[10px] flex items-center justify-center">
                <Music className="w-5 h-5 text-[#f2ca50]" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold font-heading tracking-tight text-white group-hover:text-[#f2ca50] transition">
                Swargiri
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-[#d0c5af] font-medium">
                Universal Music Ecosystem
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-300">
            <Link href="/" className="hover:text-[#f2ca50] transition">Home</Link>
            <Link href="/eras" className="hover:text-[#f2ca50] transition">Music By Era</Link>
            <Link href="/learning" className="hover:text-[#f2ca50] transition">Learning Center</Link>
            <Link href="/artist/dashboard" className="hover:text-[#f2ca50] transition">Artist Dashboard</Link>
            <Link href="/events" className="hover:text-[#f2ca50] transition">Live Events</Link>
            <Link href="/wellness" className="hover:text-[#f2ca50] transition">Corporate Wellness</Link>
          </div>

          {/* Action Buttons & Role Selector */}
          <div className="flex items-center gap-3">
            {/* AI Assistant Button */}
            <button
              onClick={() => setIsAiOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-[#201f1f] hover:bg-[#2a2a2a] border border-[#f2ca50]/40 text-[#f2ca50] font-semibold text-xs transition flex items-center gap-2 shadow-md hover:scale-105"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span className="hidden sm:inline">AI Music Assistant</span>
            </button>

            {/* Role Experience Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="px-3 py-2 rounded-xl bg-[#201f1f] border border-white/10 hover:border-[#f2ca50]/50 text-xs text-gray-200 flex items-center gap-2 transition"
                title="Switch User Experience Role"
              >
                <UserCheck className="w-4 h-4 text-[#f2ca50]" />
                <span className="hidden md:inline font-medium">{currentRole}</span>
              </button>
              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#1c1b1b] border border-[#f2ca50]/30 rounded-xl p-1.5 shadow-2xl z-50 text-xs space-y-1">
                  <div className="px-2 py-1 text-[10px] uppercase font-bold text-[#d0c5af] border-b border-white/10">
                    Switch Role Experience
                  </div>
                  {rolesList.map((r) => {
                    const Icon = r.icon;
                    return (
                      <button
                        key={r.id}
                        onClick={() => {
                          setCurrentRole(r.id);
                          setRoleMenuOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center gap-2.5 hover:bg-[#201f1f] transition ${
                          currentRole === r.id ? "bg-[#201f1f] text-[#f2ca50] font-bold" : "text-gray-300"
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0 text-[#f2ca50]" />
                        <span>{r.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#201f1f] text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-white/10 space-y-2 text-sm text-gray-300">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg hover:bg-[#201f1f] hover:text-[#f2ca50]">
              Home
            </Link>
            <Link href="/eras" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg hover:bg-[#201f1f] hover:text-[#f2ca50]">
              Music By Era
            </Link>
            <Link href="/learning" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg hover:bg-[#201f1f] hover:text-[#f2ca50]">
              Learning Center
            </Link>
            <Link href="/artist/dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg hover:bg-[#201f1f] hover:text-[#f2ca50]">
              Artist Dashboard
            </Link>
            <Link href="/events" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg hover:bg-[#201f1f] hover:text-[#f2ca50]">
              Live Events
            </Link>
            <Link href="/wellness" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-lg hover:bg-[#201f1f] hover:text-[#f2ca50]">
              Corporate Wellness
            </Link>
          </div>
        )}
      </nav>

      {/* AI Assistant Modal */}
      <AIAssistantModal isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </>
  );
};
