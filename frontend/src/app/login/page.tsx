"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Shield, Briefcase, ChevronRight, Music, UserPlus, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

type Role = "student" | "professional" | "admin";
type AuthMode = "signin" | "signup";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<Role>("student");
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  
  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to Local Storage for mock persistence
    const userSession = {
      role: activeTab,
      mode: authMode,
      name: authMode === "signup" ? name : "User", // in a real app, we'd fetch the name on signin
      email: email,
      token: "mock_jwt_token_12345",
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem("swargiri_user", JSON.stringify(userSession));

    // Dummy login/signup redirect
    router.push(`/dashboard/${activeTab}`);
  };

  const tabs = [
    { id: "student", label: "Student", icon: User, description: "Access learning resources & classes" },
    { id: "professional", label: "Professional", icon: Briefcase, description: "Manage content & professional tools" },
    { id: "admin", label: "Admin", icon: Shield, description: "System administration & overview" },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center relative">
      {/* Background decorations */}
      <div className="absolute top-[20%] left-[20%] w-[30rem] h-[30rem] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[25rem] h-[25rem] bg-pink-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl shadow-purple-500/20 mb-6">
            <Music className="text-white h-10 w-10" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter mb-2">
            {authMode === "signin" ? "Welcome Back" : "Join Swargiri"}
          </h1>
          <p className="text-foreground/60 text-lg">
            {authMode === "signin"
              ? "Sign in to your Swargiri account"
              : "Create a new account to begin your journey"}
          </p>
        </div>

        {/* Auth Mode Toggle */}
        <div className="flex bg-background/50 backdrop-blur-xl border border-foreground/10 p-1.5 rounded-full mb-8">
          <button
            onClick={() => setAuthMode("signin")}
            type="button"
            className={`flex-1 py-3 px-6 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              authMode === "signin" ? "bg-saffron text-stone-950 shadow-md" : "text-foreground/60 hover:text-foreground"
            }`}
          >
            <LogIn className="h-4 w-4" />
            Sign In
          </button>
          <button
            onClick={() => setAuthMode("signup")}
            type="button"
            className={`flex-1 py-3 px-6 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              authMode === "signup" ? "bg-saffron text-stone-950 shadow-md" : "text-foreground/60 hover:text-foreground"
            }`}
          >
            <UserPlus className="h-4 w-4" />
            Create Account
          </button>
        </div>

        {/* Role Selection */}
        <div className="bg-background/50 backdrop-blur-xl border border-foreground/10 p-2 rounded-2xl flex relative mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as Role)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all relative z-10 ${
                  isActive ? "text-white" : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon className="h-4 w-4 relative z-10" />
                <span className="relative z-10 hidden sm:inline-block">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="bg-background/80 backdrop-blur-2xl border border-foreground/10 rounded-3xl p-8 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${authMode}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-6 text-center">
                <p className="text-sm text-foreground/60 font-medium italic">
                  {tabs.find(t => t.id === activeTab)?.description}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-4">
                {authMode === "signup" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <label className="block text-xs font-black text-foreground/80 mb-2 uppercase tracking-widest text-left">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-saffron/50 transition-all font-medium"
                    />
                  </motion.div>
                )}

                <div>
                  <label className="block text-xs font-black text-foreground/80 mb-2 uppercase tracking-widest text-left">
                    {activeTab === 'admin' ? 'Admin ID' : 'Email Address'}
                  </label>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={activeTab === 'admin' ? "Enter Admin ID" : "Enter your email"}
                    className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-saffron/50 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-foreground/80 mb-2 uppercase tracking-widest text-left">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={authMode === "signup" ? "Create a password" : "Enter your password"}
                    className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-saffron/50 transition-all font-medium"
                  />
                </div>
                
                {authMode === "signin" && (
                  <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="rounded border-foreground/20 text-saffron focus:ring-saffron/50 bg-foreground/5" />
                      <span className="text-xs font-bold uppercase tracking-widest text-foreground/60 group-hover:text-foreground transition-colors">Remember me</span>
                    </label>
                    <a href="#" className="text-xs font-bold uppercase tracking-widest text-saffron hover:underline transition-colors">
                      Forgot Password?
                    </a>
                  </div>
                )}

                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full group relative overflow-hidden bg-primary-purple text-white font-black uppercase tracking-widest text-sm py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {authMode === "signin" ? "Sign In To " : "Create "}
                      {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} {authMode === "signin" ? "Dashboard" : "Account"}
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </div>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
