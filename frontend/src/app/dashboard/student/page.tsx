"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, BookOpen, Clock, Award, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
  const [userName, setUserName] = useState("Student");
  const router = useRouter();

  useEffect(() => {
    const sessionStr = localStorage.getItem("swargiri_user");
    if (!sessionStr) {
      router.push("/login");
      return;
    }
    
    try {
      const session = JSON.parse(sessionStr);
      if (session.role !== "student") {
        router.push("/login");
        return;
      }
      if (session.name) setUserName(session.name);
    } catch {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("swargiri_user");
    router.push("/login");
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl shadow-lg">
              <User className="text-white h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tighter">Welcome, {userName}</h1>
              <p className="text-foreground/60 text-lg">Your Student Portal & Learning Journey</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-background/50 border border-foreground/10 text-foreground/60 hover:text-foreground hover:bg-foreground/5 shadow-lg transition-all font-bold text-sm uppercase tracking-widest"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Enrolled Classes", value: "4", icon: BookOpen, color: "from-blue-500 to-cyan-500" },
            { label: "Hours Learned", value: "24.5", icon: Clock, color: "from-indigo-500 to-purple-500" },
            { label: "Certificates", value: "2", icon: Award, color: "from-pink-500 to-rose-500" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-background/50 backdrop-blur-xl border border-foreground/10 p-6 rounded-3xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground/80">{stat.label}</h3>
              </div>
              <p className="text-4xl font-black">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-background/50 backdrop-blur-xl border border-foreground/10 rounded-3xl p-8">
          <h2 className="text-2xl font-bold mb-6">Recent Classes</h2>
          <div className="space-y-4">
            {[
              "Introduction to Harmonium Basics",
              "Vitthal Bhajan Vocal Training - Part 1",
              "Rhythm and Tabla Fundamentals",
            ].map((course, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-foreground/5 rounded-2xl hover:bg-foreground/10 transition-colors cursor-pointer">
                <div>
                  <h4 className="font-bold text-lg">{course}</h4>
                  <p className="text-sm text-foreground/60">Continue where you left off</p>
                </div>
                <button className="px-6 py-2 bg-indigo-500 text-white font-bold rounded-xl text-sm">Resume</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
