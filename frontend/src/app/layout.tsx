import type { Metadata } from "next";
import { Source_Serif_4, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { AudioPlayerProvider } from "@/context/AudioPlayerContext";
import { Navbar } from "@/components/Navbar";
import { MusicPlayer } from "@/components/MusicPlayer";
import { LyricsModal } from "@/components/LyricsModal";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";

const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--font-heading" });
const hankenGrotesk = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Swargiri - Universal Music Ecosystem",
  description: "Global music platform serving casual listeners, students, artists, kirtankars, instructors, and corporate wellness.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
      </head>
      <body className={`${hankenGrotesk.variable} ${sourceSerif.variable} antialiased bg-[#131313] text-[#e5e2e1] min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AudioPlayerProvider>
            <div className="relative min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1 pb-28">{children}</main>
              <MusicPlayer />
              <LyricsModal />
              <ServiceWorkerRegister />

              <footer className="bg-[#0e0e0e] border-t border-white/10 py-12 px-6 text-xs text-[#d0c5af] mb-20 md:mb-16">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                  <div>
                    <h3 className="text-xl font-bold font-heading text-white tracking-wider">SWARGIRI</h3>
                    <p className="mt-1 text-gray-400">Universal Music Ecosystem for Every Genre, Era & User Role.</p>
                  </div>
                  <div className="flex flex-wrap gap-6 text-gray-400">
                    <a href="/eras" className="hover:text-[#f2ca50]">Music By Era</a>
                    <a href="/learning" className="hover:text-[#f2ca50]">Learning Center</a>
                    <a href="/artist/dashboard" className="hover:text-[#f2ca50]">Artist Dashboard</a>
                    <a href="/wellness" className="hover:text-[#f2ca50]">Corporate Wellness</a>
                  </div>
                  <div>
                    &copy; {new Date().getFullYear()} Swargiri. All rights reserved. Licensed Metadata.
                  </div>
                </div>
              </footer>
            </div>
          </AudioPlayerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
