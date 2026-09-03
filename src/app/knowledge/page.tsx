import React from 'react';
import { KnowledgeVaultShowcase } from '@/components/knowledge-book';
import Link from 'next/link';
import { ArrowLeft, BookMarked } from 'lucide-react';

export const metadata = {
  title: 'Interactive 3D Books & Beams | Emre Aslan',
  description:
    'Interactive 3D Book and Animated Data Beam component showcase inspired by Inspira UI and Magic UI.',
};

export default function KnowledgePage() {
  return (
    <main className="min-h-screen py-10 px-4 flex flex-col items-center justify-center relative">
      <div className="w-full max-w-6xl flex items-center justify-between mb-6 px-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Portfolio
        </Link>

        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <BookMarked className="size-3.5" />
          <span>INSPIRA 3D BOOK × MAGIC UI BEAMS</span>
        </div>
      </div>

      <KnowledgeVaultShowcase />
    </main>
  );
}
