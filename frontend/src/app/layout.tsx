import type { Metadata } from "next";
import { Cinzel, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Navbar } from "@/components/Navbar";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-heading" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Swargiri - The Digital Kirtan & Bhajan Platform",
  description: "Experience divine peace with curated devotional music, kirtans, and spiritual learning.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${cinzel.variable} antialiased selection:bg-saffron/30`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="relative min-h-screen bg-background text-foreground transition-colors duration-500">
            {/* Background elements */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
              <div className="absolute top-[10%] left-[10%] w-[40rem] h-[40rem] bg-saffron/5 rounded-full blur-[120px] animate-pulse" />
              <div className="absolute bottom-[10%] right-[10%] w-[30rem] h-[30rem] bg-marigold/5 rounded-full blur-[100px] animate-pulse delay-1000" />
            </div>

            <Navbar />
            <main className="pt-24 pb-32">{children}</main>
            <MusicPlayer />
            <ServiceWorkerRegister />

            <footer className="py-20 px-6 border-t border-foreground/5 bg-foreground/2">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div>
                  <h3 className="text-2xl font-black tracking-tighter mb-2 italic">SWARGIRI</h3>
                  <p className="text-foreground/40 text-sm italic">"The essence of devotion, captured digitally."</p>
                </div>
                <div className="text-foreground/40 text-sm">
                  &copy; {new Date().getFullYear()} Swargiri. All rights reserved.
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
