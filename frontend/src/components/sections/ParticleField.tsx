"use client";

import * as React from "react";

/** Lightweight AI-themed particle network rendered on canvas.
 *  Respects prefers-reduced-motion and pauses when off-screen. */
export function ParticleField() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
    }

    let particles: Particle[] = [];

    function resize() {
      if (!canvas) return;
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * DPR;
      canvas.height = height * DPR;
      const count = Math.min(70, Math.floor((width * height) / 18000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25 * DPR,
        vy: (Math.random() - 0.5) * 0.25 * DPR,
        r: (Math.random() * 1.4 + 0.6) * DPR,
      }));
    }

    function tick() {
      if (!canvas || !ctx || !running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const linkDist = 130 * DPR;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 124, 0, 0.5)";
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255, 124, 0, ${0.12 * (1 - dist / linkDist)})`;
            ctx.lineWidth = DPR * 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
      if (running) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(tick);
      }
    });
    observer.observe(canvas);

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
