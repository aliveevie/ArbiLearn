'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

export function VantaGlobe() {
  const vantaRef = useRef(null);
  const [scriptsLoaded, setScriptsLoaded] = useState({
    three: false,
    vanta: false
  });

  useEffect(() => {
    if (!scriptsLoaded.three || !scriptsLoaded.vanta || !vantaRef.current) return;

    // @ts-ignore
    const vantaEffect = window.VANTA.GLOBE({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x6366f1,
      backgroundColor: 0x0a0a0a,
      size: 1.50,
      speed: 1.00
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [scriptsLoaded]);

  const handleThreeLoad = () => {
    setScriptsLoaded(prev => ({ ...prev, three: true }));
  };

  const handleVantaLoad = () => {
    setScriptsLoaded(prev => ({ ...prev, vanta: true }));
  };

  return (
    <>
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        onLoad={handleThreeLoad}
      />
      <Script 
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js"
        onLoad={handleVantaLoad}
      />
      <div 
        ref={vantaRef}
        className="fixed inset-0 -z-10 bg-black"
        style={{ height: '100vh', width: '100vw' }}
      />
    </>
  );
}