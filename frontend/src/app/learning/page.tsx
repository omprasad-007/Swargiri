"use client";

import React, { useState } from "react";
import { GraduationCap, BookOpen, Award, CheckCircle, Play, Star } from "lucide-react";

export default function LearningCenterPage() {
  const [selectedInstrument, setSelectedInstrument] = useState<string>("All");

  const instruments = [
    "All", "Singing", "Harmonium", "Tabla", "Mridang", "Guitar", 
    "Piano", "Keyboard", "Drums", "Violin", "Flute", "Music Theory", "Production", "Songwriting"
  ];

  const courses = [
    {
      id: "c1",
      title: "Mastering Classical Indian Vocals & Raga Theory",
      instrument: "Singing",
      instructor: "Vidushi Kishori Amonkar Tradition",
      level: "Beginner to Advanced",
      duration: "12 Hours",
      lessons: 18,
      rating: 4.9,
      students: 1420,
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600",
      description: "Learn fundamental Swaras, Alankars, Raag Yaman, and Khayal vocal techniques."
    },
    {
      id: "c2",
      title: "Harmonium & Bhajan Accompaniment Essentials",
      instrument: "Harmonium",
      instructor: "Pandit Appasaheb Jalgaonkar Academy",
      level: "Beginner",
      duration: "8 Hours",
      lessons: 12,
      rating: 4.8,
      students: 980,
      image: "https://images.unsplash.com/photo-1545128485-c400e7702796?w=600",
      description: "Master finger placement, bellows control, chord structures, and accompanying Kirtans."
    },
    {
      id: "c3",
      title: "Tabla Rhythm Patterns: Teental, Dadra & Keherwa",
      instrument: "Tabla",
      instructor: "Ustad Zakir Hussain Style Masterclass",
      level: "Intermediate",
      duration: "15 Hours",
      lessons: 22,
      rating: 5.0,
      students: 2310,
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600",
      description: "Deep dive into Dayan/Bayan bol clarity, Tihai structure, and Ghazal accompaniment."
    },
    {
      id: "c4",
      title: "Modern Digital Music Production & Raga Fusion",
      instrument: "Production",
      instructor: "Swargiri Studio Labs",
      level: "Intermediate",
      duration: "10 Hours",
      lessons: 14,
      rating: 4.7,
      students: 850,
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600",
      description: "Learn DAW mixing, spatial reverb setup, sampling acoustic instruments, and lo-fi beats."
    }
  ];

  const filteredCourses = selectedInstrument === "All"
    ? courses
    : courses.filter((c) => c.instrument === selectedInstrument);

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] py-12 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header matching Stitch screen */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#201f1f] border border-[#f2ca50]/30 text-xs text-[#f2ca50] font-semibold mb-3">
          <GraduationCap className="w-4 h-4" />
          <span>Swargiri Music Academy & Skill Center</span>
        </div>
        <h1 className="text-4xl font-extrabold font-heading text-white">Learning Center</h1>
        <p className="text-sm text-[#d0c5af] mt-2 max-w-xl">
          Learn Indian & Western instruments, vocal performance, music theory, and studio production from master instructors.
        </p>
      </div>

      {/* Instrument Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {instruments.map((inst) => (
          <button
            key={inst}
            onClick={() => setSelectedInstrument(inst)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
              selectedInstrument === inst
                ? "bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-black border-transparent shadow-lg"
                : "bg-[#1c1b1b] text-gray-300 border-white/10 hover:border-[#f2ca50]/40 hover:text-white"
            }`}
          >
            {inst}
          </button>
        ))}
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-[#1c1b1b] border border-white/10 hover:border-[#f2ca50]/30 rounded-2xl overflow-hidden shadow-2xl transition duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-52 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] uppercase font-bold text-[#f2ca50]">
                  {course.instrument}
                </span>
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#f2ca50] text-black text-[10px] font-bold">
                  {course.level}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-[#f2ca50] mb-2 font-semibold">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{course.rating} ({course.students} enrolled students)</span>
                </div>
                <h3 className="text-xl font-bold font-heading text-white">{course.title}</h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">{course.description}</p>
                <p className="text-xs text-[#d0c5af] font-medium mt-3">Instructor: {course.instructor}</p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#f2ca50]" /> {course.lessons} Lessons ({course.duration})
              </span>
              <button className="px-4 py-2 rounded-xl bg-[#f2ca50] text-black font-bold hover:scale-105 transition flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 fill-current" /> Enroll Course
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Architecture Banner */}
      <div className="p-8 rounded-2xl bg-[#201f1f] border border-[#f2ca50]/20 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-[#f2ca50] text-black shrink-0">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-heading text-white">Swargiri Academy Certificate</h3>
            <p className="text-xs text-[#d0c5af] mt-1">
              Earn verified digital certificates of completion signed by master instructors upon finishing all course modules.
            </p>
          </div>
        </div>
        <button className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-semibold text-xs transition shrink-0">
          View Certificate Sample
        </button>
      </div>
    </div>
  );
}
