import React, { useEffect, useState } from 'react';

/**
 * Mobile-Optimized 7-Second Glass Shatter Engine:
 * - Uses pure GPU-composited 3D transforms (translate3d, scale, rotate3d).
 * - Avoids expensive backdrop-filter:blur on individual animated shards to eliminate mobile frame drops.
 * - 7-second duration for smooth slow-motion cinematic explosion.
 */
export default function GlassShatter({ buttonRect, onComplete }) {
  const [shards, setShards] = useState([]);
  const [shattered, setShattered] = useState(false);

  useEffect(() => {
    const originX = buttonRect ? buttonRect.left + buttonRect.width / 2 : window.innerWidth / 2;
    const originY = buttonRect ? buttonRect.top + buttonRect.height / 2 : window.innerHeight / 2;

    // 24 optimized polygon shards
    const count = 24;
    const generated = Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.35;
      
      // Radial velocity across screen
      const dist = Math.random() * 450 + 280;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist + (Math.random() * 100); // slight gravity pull
      
      // Fly towards user's screen (Z-axis in 3D perspective)
      const tz = Math.random() * 900 + 600;

      const rx = (Math.random() - 0.5) * 900;
      const ry = (Math.random() - 0.5) * 900;
      const rz = (Math.random() - 0.5) * 540;

      // Unique irregular crystalline shard polygon
      const p1 = `${Math.floor(Math.random() * 30)}% 0%`;
      const p2 = `100% ${Math.floor(Math.random() * 35)}%`;
      const p3 = `${Math.floor(Math.random() * 30 + 70)}% 100%`;
      const p4 = `0% ${Math.floor(Math.random() * 40 + 60)}%`;
      const clipPath = `polygon(${p1}, ${p2}, ${p3}, ${p4})`;

      const width = Math.random() * 38 + 22;
      const height = Math.random() * 46 + 24;

      return {
        id: i,
        clipPath,
        width,
        height,
        tx,
        ty,
        tz,
        rx,
        ry,
        rz,
        delay: Math.random() * 0.15,
      };
    });

    setShards(generated);
    setShattered(true);

    // 7 seconds total duration for cinematic slow motion
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 7000);

    return () => clearTimeout(timer);
  }, [buttonRect, onComplete]);

  const originX = buttonRect ? buttonRect.left + buttonRect.width / 2 : window.innerWidth / 2;
  const originY = buttonRect ? buttonRect.top + buttonRect.height / 2 : window.innerHeight / 2;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      style={{
        perspective: '1000px',
        perspectiveOrigin: `${originX}px ${originY}px`,
        transform: 'translateZ(0)',
      }}
    >
      {/* Light flash on initial fracture */}
      <div className="absolute inset-0 bg-white/40 pointer-events-none animate-shatter-flash" />

      {/* Optimized Expanding Shockwave Ring (hardware-accelerated scale) */}
      <div
        className="absolute w-20 h-20 -ml-10 -mt-10 rounded-full border-2 border-purple-300 pointer-events-none animate-shockwave-smooth"
        style={{
          left: `${originX}px`,
          top: `${originY}px`,
          willChange: 'transform, opacity',
        }}
      />

      {/* Floating 3D Shards (7-second smooth trajectory) */}
      {shattered &&
        shards.map((s) => (
          <div
            key={s.id}
            className="absolute animate-shard-7s"
            style={{
              left: `${originX}px`,
              top: `${originY}px`,
              width: `${s.width}px`,
              height: `${s.height}px`,
              marginLeft: `-${s.width / 2}px`,
              marginTop: `-${s.height / 2}px`,
              clipPath: s.clipPath,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(216,180,254,0.65) 45%, rgba(168,85,247,0.3) 100%)',
              border: '1px solid rgba(255,255,255,0.85)',
              boxShadow: '0 0 10px rgba(192,132,252,0.8)',
              animationDelay: `${s.delay}s`,
              willChange: 'transform, opacity',
              '--target-x': `${s.tx}px`,
              '--target-y': `${s.ty}px`,
              '--target-z': `${s.tz}px`,
              '--rot-x': `${s.rx}deg`,
              '--rot-y': `${s.ry}deg`,
              '--rot-z': `${s.rz}deg`,
            }}
          />
        ))}
    </div>
  );
}
