import React from 'react';

export type BookTheme = 'amber' | 'emerald' | 'violet';

export interface ThemeColors {
  id: BookTheme;
  name: string;
  primary: string; // e.g. '#f59e0b'
  secondary: string; // e.g. '#ea580c'
  glow: string;
  border: string;
  badgeBg: string;
  badgeText: string;
  gradientCover: string;
  gradientInterior: string;
  beamGradient: [string, string];
  accentText: string;
  accentBg: string;
  activeRing: string;
}

export interface Subtopic {
  id: string;
  title: string;
  category: string;
  iconName: string;
  badge: string;
  summary: string;
  deepDive: string;
  keyConcepts: string[];
  codeSnippet?: string;
  formula?: string;
}

export interface BookCategory {
  id: string;
  theme: BookTheme;
  title: string;
  subtitle: string;
  volume: string;
  tagline: string;
  description: string;
  spineTitle: string;
  edition: string;
  totalPages: number;
  stats: {
    chapters: number;
    nodes: number;
    difficulty: 'Intermediate' | 'Advanced' | 'Expert';
    readTime: string;
  };
  subtopics: Subtopic[];
}

export interface Point {
  x: number;
  y: number;
}

export interface BeamPathData {
  id: string;
  path: string;
  start: Point;
  end: Point;
  index: number;
}
