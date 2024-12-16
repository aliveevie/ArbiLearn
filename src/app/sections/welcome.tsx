'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import './welcome.css';

export function WelcomeSection() {
  const globeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (globeRef.current) {
        const rotation = window.scrollY * 0.1;
        globeRef.current.style.transform = `rotate(${rotation}deg)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="welcome-section">
      <div ref={globeRef} className="globe-background">
        <Image
          src="/globe-image.jpg"
          alt="Digital Globe"
          fill
          priority
          className="globe-image"
          quality={100}
        />
        <div className="overlay" />
      </div>

      <div className="content-container">
        <div className="content-wrapper">
          <h1 className="main-title">ArbiLearn</h1>
          <p className="subtitle">EXPLORE THE FUTURE OF WEB3</p>
          <button className="cta-button">Begin Your Journey</button>
        </div>
      </div>

      <div className="bottom-border" />
      <div className="corner-accent top-left" />
      <div className="corner-accent bottom-right" />
    </section>
  );
}