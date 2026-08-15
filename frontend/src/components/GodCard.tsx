"use client";

import Link from 'next/link';

interface GodCardProps {
  name: string;
}

export default function GodCard({ name }: GodCardProps) {
  const imageUrl = `/images/${name.toLowerCase()}.jpg`;

  return (
    <Link href={`/${name.toLowerCase()}`} className="block group">
      <div className="glass-card overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_20px_50px_rgba(139,92,246,0.3)] border-none">
        <div className="relative w-full h-72 bg-white/5">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => (e.currentTarget.src = "https://images.unsplash.com/photo-1549417229-aa67d3263c09?q=80&w=800&auto=format&fit=crop")} // High quality fallback
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter drop-shadow-2xl mb-2">
              {name}
            </h2>
            <div className="h-1 w-12 bg-primary rounded-full group-hover:w-full transition-all duration-500"></div>
          </div>
        </div>
      </div>
    </Link>
  );
}
