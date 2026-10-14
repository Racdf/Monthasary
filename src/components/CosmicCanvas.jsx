import React, { useEffect, useRef } from 'react';

/**
 * CosmicCanvas renders:
 * 1. 4-arm logarithmic spiral galaxy vortex orbiting the event horizon.
 * 2. Twinkling 4-point diffraction spike stars.
 * 3. Fast relativistic matter accretion streams pulled into the gravitational sink.
 * 4. Ambient floating cosmic dust particles.
 */
export default function CosmicCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 1. Four-point cross stars with diffraction spikes
    const starCount = Math.floor((width * height) / 8000);
    const stars = Array.from({ length: Math.min(starCount, 160) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.6,
      spikeLength: Math.random() * 8 + 3,
      alpha: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.008,
      phase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.4 ? '255, 255, 255' : '216, 180, 254'
    }));

    // 2. Matter accretion stream particles pulled directly into the central sink
    const streamCount = 90;
    const streamParticles = Array.from({ length: streamCount }, () => {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * (Math.min(width, height) * 0.65) + 120;
      return {
        dist,
        angle,
        speed: (Math.random() * 0.015 + 0.008) * (150 / (dist + 50)),
        inwardSpeed: Math.random() * 0.7 + 0.4,
        size: Math.random() * 1.8 + 0.8,
        color: Math.random() > 0.5 ? '168, 85, 247' : '255, 255, 255',
        trail: []
      };
    });

    // 3. 4-Arm Logarithmic Spiral Nebula points
    const armPointsCount = 550;
    const spiralArms = Array.from({ length: armPointsCount }, (_, i) => {
      const armIndex = i % 4; // 4 logarithmic arms
      const baseAngle = (armIndex * Math.PI) / 2;
      const progress = (i / armPointsCount);
      // Logarithmic spiral: r = a * e^(b * theta)
      const r = 90 + Math.pow(progress, 1.3) * (Math.min(width, height) * 0.55);
      const theta = baseAngle + Math.log(r / 60) * 2.8 + (Math.random() - 0.5) * 0.4;
      const spread = (Math.random() - 0.5) * (r * 0.16);

      return {
        r: r + spread,
        theta,
        baseTheta: theta,
        size: Math.random() * 2.2 + 0.6,
        alpha: (1 - progress * 0.7) * (Math.random() * 0.5 + 0.3),
        speed: (0.0025 + (1 / (r + 80)) * 0.4),
        hue: Math.random() > 0.35 ? '147, 51, 234' : '230, 210, 255'
      };
    });

    let time = 0;

    const render = () => {
      time += 0.012;
      const cx = width / 2;
      const cy = height / 2;

      // Pure pitch black background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Deep celestial radial haze around center
      const radialGradient = ctx.createRadialGradient(cx, cy, 60, cx, cy, Math.max(width, height) * 0.65);
      radialGradient.addColorStop(0, 'rgba(88, 28, 135, 0.45)');
      radialGradient.addColorStop(0.3, 'rgba(126, 34, 206, 0.18)');
      radialGradient.addColorStop(0.65, 'rgba(59, 7, 100, 0.08)');
      radialGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw Twinkling Cross Stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.phase += s.twinkleSpeed;
        const currentAlpha = Math.max(0.1, (Math.sin(s.phase) * 0.4 + 0.6) * s.alpha);

        // Core star
        ctx.fillStyle = `rgba(${s.color}, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

        // 4-point cross diffraction spikes for larger stars
        if (s.size > 1.2) {
          ctx.strokeStyle = `rgba(${s.color}, ${currentAlpha * 0.45})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          // Horizontal spike
          ctx.moveTo(s.x - s.spikeLength, s.y);
          ctx.lineTo(s.x + s.spikeLength, s.y);
          // Vertical spike
          ctx.moveTo(s.x, s.y - s.spikeLength);
          ctx.lineTo(s.x, s.y + s.spikeLength);
          ctx.stroke();
        }
      }

      // Draw 4-arm logarithmic spiral nebula
      for (let i = 0; i < spiralArms.length; i++) {
        const p = spiralArms[i];
        p.theta += p.speed;

        const x = cx + Math.cos(p.theta) * p.r;
        const y = cy + Math.sin(p.theta) * p.r;

        ctx.fillStyle = `rgba(${p.hue}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw matter accretion stream particles spiraling inward
      for (let i = 0; i < streamParticles.length; i++) {
        const p = streamParticles[i];
        p.angle += p.speed * 2.2;
        p.dist -= p.inwardSpeed * (1 + (150 / (p.dist + 10)));

        // If particle falls into event horizon (< 70px from center), respawn at outer rim
        if (p.dist < 72) {
          p.dist = Math.random() * (Math.min(width, height) * 0.5) + 160;
          p.angle = Math.random() * Math.PI * 2;
          p.trail = [];
        }

        const px = cx + Math.cos(p.angle) * p.dist;
        const py = cy + Math.sin(p.angle) * p.dist;

        // Draw trail
        p.trail.push({ x: px, y: py });
        if (p.trail.length > 5) p.trail.shift();

        if (p.trail.length > 1) {
          ctx.strokeStyle = `rgba(${p.color}, 0.25)`;
          ctx.lineWidth = p.size * 0.6;
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let t = 1; t < p.trail.length; t++) {
            ctx.lineTo(p.trail[t].x, p.trail[t].y);
          }
          ctx.stroke();
        }

        ctx.fillStyle = `rgba(${p.color}, 0.85)`;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
