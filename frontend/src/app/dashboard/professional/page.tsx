"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Upload, Users, PlayCircle, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfessionalDashboard() {
  const [userName, setUserName] = useState("Professional");
  const router = useRouter();

  useEffect(() => {
    const sessionStr = localStorage.getItem("swargiri_user");
    if (!sessionStr) {
      router.push("/login");
      return;
    }
    
    try {
      const session = JSON.parse(sessionStr);
      if (session.role !== "professional") {
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
            <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
              <Briefcase className="text-white h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tighter">Welcome, {userName}</h1>
              <p className="text-foreground/60 text-lg">Manage your content and engaged students</p>
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
            { label: "Active Students", value: "1,245", icon: Users, color: "from-purple-500 to-pink-500" },
            { label: "Published Tracks", value: "32", icon: PlayCircle, color: "from-fuchsia-500 to-purple-500" },
            { label: "Pending Uploads", value: "3", icon: Upload, color: "from-pink-500 to-rose-500" },
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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Latest Content</h2>
            <button className="flex items-center gap-2 px-6 py-2 bg-saffron text-white font-bold rounded-xl text-sm">
              <Upload className="h-4 w-4" /> Upload New
            </button>
          </div>
          
          <div className="space-y-4">
            {[
              { title: "Morning Shiv Aradhana", type: "Bhajan", status: "Published" },
              { title: "Advanced Harmonium Techniques", type: "Class", status: "Draft" },
              { title: "Evening Bliss Kirtan", type: "Kirtan", status: "Published" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-foreground/5 rounded-2xl hover:bg-foreground/10 transition-colors cursor-pointer">
                <div>
                  <h4 className="font-bold text-lg">{item.title}</h4>
                  <p className="text-sm text-foreground/60">{item.type}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === 'Published' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                    {item.status}
                  </span>
                  <button className="text-sm font-bold text-purple-500 hover:text-pink-500">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
