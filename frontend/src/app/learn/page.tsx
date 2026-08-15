"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, PlayCircle, Star, Users, Award, Clock } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Varkari Kirtan Training",
    instructor: "Nitin Maharaj Bangar",
    thumbnail: "https://images.unsplash.com/photo-1514525253361-b8744b932782?auto=format&fit=crop&q=80&w=400",
    students: "1.2k+",
    rating: 4.9,
    duration: "12 Hours",
    level: "Beginner",
  },
  {
    id: 2,
    title: "Harmonium Mastery",
    instructor: "Pt. Rahul Deshpande",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400",
    students: "850+",
    rating: 4.8,
    duration: "8 Hours",
    level: "Intermediate",
  },
  {
    id: 3,
    title: "Tabla Fundamentals",
    instructor: "Ustad Zakir Hussain (Masterclass)",
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=400",
    students: "2.5k+",
    rating: 5.0,
    duration: "15 Hours",
    level: "All Levels",
  },
  {
    id: 4,
    title: "Abhang Singing",
    instructor: "Anjali Maharaj",
    thumbnail: "https://images.unsplash.com/photo-1514320298372-730609337b54?auto=format&fit=crop&q=80&w=400",
    students: "500+",
    rating: 4.7,
    duration: "6 Hours",
    level: "Beginner",
  }
];

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-background py-32 px-6">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Header */}
        <section className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-saffron/10 border border-saffron/20 text-saffron text-xs font-black uppercase tracking-widest"
          >
            <BookOpen className="h-3 w-3" />
            Academy
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase"
          >
            MASTER THE <span className="text-saffron">DIVINE</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-foreground/40 max-w-2xl mx-auto font-light italic"
          >
            Learn traditional kirtan, bhajan, and Indian instruments from world-class masters.
          </motion.p>
        </section>

        {/* Categories */}
        <section className="flex flex-wrap justify-center gap-4">
          {["All Courses", "Vocal Training", "Instruments", "Harmonium", "Tabla", "Theory"].map((cat) => (
            <button key={cat} className="px-8 py-3 rounded-2xl glass text-xs font-black uppercase tracking-widest hover:bg-saffron hover:text-stone-950 transition-all border-none">
              {cat}
            </button>
          ))}
        </section>

        {/* Course Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass rounded-[2.5rem] overflow-hidden group border-none shadow-2xl hover:shadow-saffron/10"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={course.thumbnail} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={course.title} />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <PlayCircle className="h-12 w-12 text-white" />
                </div>
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-stone-950/80 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-saffron">
                  {course.level}
                </div>
              </div>
              <div className="p-8 space-y-4">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-marigold fill-marigold" />
                    {course.rating}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {course.students}
                  </div>
                </div>
                <h3 className="text-xl font-black italic uppercase leading-tight group-hover:text-saffron transition-colors">
                  {course.title}
                </h3>
                <p className="text-xs text-foreground/40 font-bold uppercase tracking-widest">{course.instructor}</p>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter opacity-40">
                      <Clock className="h-3 w-3" />
                      {course.duration}
                   </div>
                   <button className="text-xs font-black uppercase tracking-widest text-saffron hover:underline">
                      Enroll
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Certification Promise */}
        <section className="py-20 flex justify-center">
           <div className="glass p-12 rounded-[4rem] max-w-4xl w-full flex flex-col md:flex-row items-center gap-12 border-none">
              <div className="w-24 h-24 bg-marigold/20 rounded-full flex items-center justify-center shrink-0">
                 <Award className="h-12 w-12 text-marigold" />
              </div>
              <div className="space-y-4 text-center md:text-left">
                 <h2 className="text-3xl font-black italic uppercase tracking-tighter">Verified Certification</h2>
                 <p className="text-foreground/40 font-light italic">
                   Earn authentic certifications recognized by traditional music institutions and temples upon course completion.
                 </p>
              </div>
              <button className="px-10 py-4 bg-white text-black font-black uppercase tracking-widest rounded-3xl shrink-0 hover:bg-saffron transition-colors">
                 Learn More
              </button>
           </div>
        </section>
      </div>
    </div>
  );
}
