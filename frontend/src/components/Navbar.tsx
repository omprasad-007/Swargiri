"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Music } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { getTranslation } from "@/lib/i18n";

const baseNavItems = [
  { key: "home", href: "/" },
  { key: "bhajans", href: "/bhajans" },
  { key: "kirtans", href: "/kirtans" },
  { key: "learn", href: "/learn" },
  { key: "calm", href: "/calm" },
  { key: "about", href: "/about" },
];

const languages = [
  { code: "en", label: "EN" },
  { code: "hi", label: "HI" },
  { code: "mr", label: "MR" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLanguage = (lang: string) => {
    setCurrentLang(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("swargiri_lang", lang);
      // We will later wire this to fire a custom event or context update
      window.dispatchEvent(new Event("languageChanged"));
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("swargiri_lang");
      if (savedLang) setCurrentLang(savedLang);
    }
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-foreground/5 shadow-lg" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg group-hover:rotate-12 transition-transform duration-300">
            <Music className="text-white h-6 w-6" />
          </div>
          <span className="text-xl font-black tracking-tighter text-foreground uppercase">
            SWAR<span className="text-saffron">GIRI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <ul className="flex gap-4 lg:gap-8">
            {baseNavItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="relative text-xs lg:text-sm font-bold uppercase tracking-widest text-foreground/70 hover:text-foreground transition-colors group"
                >
                  {getTranslation(currentLang, "nav", item.key)}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="h-6 w-px bg-foreground/10 mx-2" />
          
          {/* Language Switcher Desktop */}
          <div className="flex gap-2 bg-white/5 rounded-full p-1 border border-white/10 text-xs font-bold">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => changeLanguage(l.code)}
                className={cn(
                  "px-2 py-1 rounded-full transition-colors",
                  currentLang === l.code ? "bg-saffron text-stone-950" : "text-foreground/60 hover:text-foreground"
                )}
              >
                {l.label}
              </button>
            ))}
          </div>

          <Link
            href="/login"
            className="px-6 py-2 rounded-full bg-saffron text-white font-bold text-sm uppercase tracking-widest hover:bg-marigold transition-colors shadow-lg hover:shadow-saffron/20 whitespace-nowrap"
          >
            {getTranslation(currentLang, "nav", "login")}
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <Link href="/login" className="text-xs sm:text-sm font-bold uppercase text-saffron">{getTranslation(currentLang, "nav", "login")}</Link>
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

        {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-2xl border-b border-foreground/5 overflow-hidden absolute top-full left-0 right-0 shadow-2xl"
          >
            <ul className="flex flex-col gap-4 p-6">
              {baseNavItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-bold text-foreground/70 hover:text-primary transition-colors block border-b border-foreground/5 pb-2"
                  >
                    {getTranslation(currentLang, "nav", item.key)}
                  </Link>
                </li>
              ))}
              
              <li className="py-2">
                <div className="flex items-center gap-4 text-sm font-bold uppercase text-foreground/50">
                  <span>{getTranslation(currentLang, "nav", "language")}</span>
                  <div className="flex gap-2">
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          changeLanguage(l.code);
                          setIsOpen(false);
                        }}
                        className={cn(
                          "px-3 py-1 rounded-full transition-colors",
                          currentLang === l.code ? "bg-saffron text-stone-950" : "bg-white/5 text-foreground/80 hover:bg-white/10"
                        )}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
