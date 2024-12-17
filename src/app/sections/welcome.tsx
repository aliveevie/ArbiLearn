'use client';

import { VantaGlobe } from './vanta';

export function WelcomeSection() {
  return (
    <section className="relative h-[calc(100vh-4rem)] overflow-hidden">
      <VantaGlobe />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Welcome to ArbiLearn</h1>
      </div>
    </section>
  );
}

