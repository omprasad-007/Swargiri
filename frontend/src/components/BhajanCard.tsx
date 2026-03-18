import Link from 'next/link';

interface BhajanCardProps {
  god: string;
  id: string;
  title: string;
}

export default function BhajanCard({ god, id, title }: BhajanCardProps) {
  return (
    <Link href={`/${god}/${id}`} className="block group">
      <div className="glass-card p-8 cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:bg-white/[0.08] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{title}</h3>
        <span className="inline-flex items-center text-secondary font-semibold group-hover:translate-x-2 transition-transform duration-300">
          Listen Now
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
