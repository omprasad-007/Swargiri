"use client";

import { motion } from "framer-motion";
import { Users, Music2, Calendar, MapPin } from "lucide-react";

export default function KirtansPage() {
  const KIRTAN_EVENTS = [
    {
      title: "Evening Maha Kirtan",
      host: "Sri Radhanath Swami Group",
      time: "Today, 6:00 PM",
      location: "Live Stream / Temple ISKCON",
      type: "Live",
      attendees: "2.4k",
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Sunday Special Sankirtan",
      host: "Mayapur Chandras",
      time: "Sunday, 10:00 AM",
      location: "Mayapur / Online",
      type: "Upcoming",
      attendees: "15k+",
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "24-Hour Akhand Kirtan",
      host: "Vrindavan Devotees",
      time: "Started 12 hours ago",
      location: "Krishna Balaram Mandir",
      type: "Live",
      attendees: "8.1k",
      color: "from-amber-500 to-orange-500"
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-2xl shadow-xl shadow-pink-500/20 mb-6">
            <Users className="h-10 w-10" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 font-heading">Global Kirtans</h1>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto italic">
            "Join the global community in congregational chanting. Experience the joy of Sankirtan."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {KIRTAN_EVENTS.map((event, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="bg-background/50 backdrop-blur-xl border border-foreground/10 p-6 rounded-3xl relative overflow-hidden group hover:border-foreground/20 transition-colors"
            >
              <div className={`absolute top-0 right-0 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white rounded-bl-xl bg-gradient-to-r ${event.color}`}>
                {event.type}
              </div>
              
              <div className="mb-6">
                <h3 className="text-2xl font-black mb-2 leading-tight">{event.title}</h3>
                <p className="text-foreground/60 text-sm font-bold">{event.host}</p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-foreground/80 font-medium">
                  <Calendar className="w-4 h-4 text-foreground/40" />
                  {event.time}
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground/80 font-medium">
                  <MapPin className="w-4 h-4 text-foreground/40" />
                  {event.location}
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground/80 font-medium">
                  <Users className="w-4 h-4 text-foreground/40" />
                  {event.attendees} attending
                </div>
              </div>

              <button className={`w-full py-4 rounded-xl font-bold text-white shadow-lg bg-gradient-to-r ${event.color} hover:scale-[1.02] active:scale-[0.98] transition-transform`}>
                {event.type === 'Live' ? 'Join Stream' : 'Set Reminder'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
