'use client';

import React from 'react';
import { SkiperScrollStack } from './skiper-scroll-stack';
import { Sparkles } from 'lucide-react';

export const KnowledgeVaultShowcase: React.FC = () => {
  return (
    <div className="relative w-full py-2">
      <SkiperScrollStack />
      
      {/* Bottom Subtitle */}
      <div className="flex items-center justify-center gap-2 text-xs font-mono text-muted-foreground -mt-8 pb-4 text-center">
        <Sparkles className="size-3.5" />
        <span>3 DOMAIN VOLUMES • 15 COMPILED PILLARS • 3D INTERACTIVE KNOWLEDGE VAULT</span>
      </div>
    </div>
  );
};

export default KnowledgeVaultShowcase;
