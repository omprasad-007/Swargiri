export default function Footer() {
  return (
    <footer className="w-full py-16 px-6 mt-20 bg-dark/50 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
        <div className="max-w-md">
          <h3 className="text-3xl font-black text-white mb-4 tracking-tighter uppercase">Swargaari</h3>
          <p className="text-white/40 leading-relaxed italic">
            "Music is the mediator between the spiritual and the sensual life."
            A dedicated sanctuary for divine melodies and spiritual growth.
          </p>
        </div>

        <div className="flex flex-col gap-4 text-white/50 text-sm max-w-sm">
          <h4 className="text-white font-bold uppercase tracking-widest mb-2">Notice</h4>
          <p>
            All devotional content is streamed via YouTube API. We respect all intellectual property rights and host no media on our servers.
          </p>
          <p className="font-bold text-white/20">
            &copy; {new Date().getFullYear()} Swargaari Sanctuary.
          </p>
        </div>
      </div>
    </footer>
  );
}
