"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Activity, Users, Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [userName, setUserName] = useState("Admin");
  const router = useRouter();

  useEffect(() => {
    const sessionStr = localStorage.getItem("swargiri_user");
    if (!sessionStr) {
      router.push("/login");
      return;
    }
    
    try {
      const session = JSON.parse(sessionStr);
      if (session.role !== "admin") {
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
            <div className="p-4 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl shadow-lg">
              <Shield className="text-white h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tighter">Welcome, {userName}</h1>
              <p className="text-foreground/60 text-lg">Platform overview and system health</p>
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Users", value: "14,592", icon: Users, color: "from-blue-500 to-cyan-500" },
            { label: "Active Sessions", value: "843", icon: Activity, color: "from-green-500 to-emerald-500" },
            { label: "Content Items", value: "5,230", icon: Shield, color: "from-purple-500 to-pink-500" },
            { label: "System Status", value: "Optimal", icon: Settings, color: "from-slate-500 to-slate-700" },
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
                <h3 className="text-sm font-bold text-foreground/80 uppercase tracking-wider">{stat.label}</h3>
              </div>
              <p className="text-3xl font-black">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-background/50 backdrop-blur-xl border border-foreground/10 rounded-3xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recent Platform Activity</h2>
            <button className="text-sm font-bold text-foreground/60 hover:text-foreground">View All Logs</button>
          </div>
          
          <div className="space-y-4">
            {[
              { action: "New Professional Account Verification Request", user: "Pt. Ramesh Shankar", time: "2 mins ago" },
              { action: "System Backup Completed Successfully", user: "System", time: "1 hour ago" },
              { action: "Flagged Content Review Pending", user: "Auto-Moderator", time: "3 hours ago" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-foreground/5 rounded-2xl hover:bg-foreground/10 transition-colors">
                <div>
                  <h4 className="font-bold">{item.action}</h4>
                  <p className="text-sm text-foreground/60">Triggered by {item.user}</p>
                </div>
                <span className="text-xs font-bold text-foreground/40">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
