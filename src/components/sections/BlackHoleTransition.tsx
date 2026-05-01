"use client";
import { useRef, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

interface WarpStar {
  angle: number;
  dist: number;
  speed: number;
  brightness: number;
  size: number;
}

export default function BlackHoleTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const animIdRef = useRef<number>(0);
  const timeRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
  });

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);

    // Warp stars — radial from center
    const stars: WarpStar[] = Array.from({ length: 700 }, () => ({
      angle: Math.random() * Math.PI * 2,
      dist: Math.random() * 0.9 + 0.05,
      speed: 0.3 + Math.random() * 0.9,
      brightness: 0.5 + Math.random() * 0.5,
      size: 0.4 + Math.random() * 1.6,
    }));

    function smooth(p: number, s: number, e: number): number {
      if (p <= s) return 0;
      if (p >= e) return 1;
      const t = (p - s) / (e - s);
      return t * t * (3 - 2 * t);
    }

    function draw() {
      animIdRef.current = requestAnimationFrame(draw);
      timeRef.current += 0.016;
      const t = timeRef.current;

      const p = progressRef.current;
      const cx = W / 2;
      const cy = H / 2;
      const maxDim = Math.max(W, H);

      // Phase weights
      const approachP = smooth(p, 0.0, 0.50);   // approach: 0 → 50%
      const entryP    = smooth(p, 0.45, 0.65);   // entry / singularity: 45 → 65%
      // No exit phase — just darkness then next section

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);

      // ---- WARP STARS ----
      const starVis = Math.max(0, 1 - entryP * 2);
      if (starVis > 0.01) {
        const warpSpeed = 0.001 + approachP * 0.02;
        for (const s of stars) {
          s.dist += warpSpeed * s.speed;
          if (s.dist > 1.5) {
            s.dist = 0.01 + Math.random() * 0.04;
            s.angle = Math.random() * Math.PI * 2;
          }
          const r = s.dist * maxDim * 0.55;
          const sx = cx + Math.cos(s.angle) * r;
          const sy = cy + Math.sin(s.angle) * r * 0.88;
          if (sx < -5 || sx > W + 5 || sy < -5 || sy > H + 5) continue;

          const trailLen = approachP * 22 * s.speed;
          if (trailLen > 2) {
            const tx = cx + Math.cos(s.angle) * (r - trailLen);
            const ty = cy + Math.sin(s.angle) * (r - trailLen) * 0.88;
            ctx.beginPath();
            ctx.moveTo(tx, ty);
            ctx.lineTo(sx, sy);
            ctx.strokeStyle = `rgba(255,255,255,${s.brightness * starVis * 0.7})`;
            ctx.lineWidth = s.size * 0.8;
            ctx.stroke();
          } else {
            ctx.beginPath();
            ctx.arc(sx, sy, s.size * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${s.brightness * starVis})`;
            ctx.fill();
          }
        }
      }

      // ---- BLACK HOLE ----
      // Quadratic growth: starts tiny, surges large as you get close
      const bhR = maxDim * (0.055 + approachP * approachP * 0.42);
      const bhVis = Math.min(approachP * 3, 1) * Math.max(0, 1 - entryP * 4);

      if (bhVis > 0.01) {
        // ---- OUTER DIFFUSE HAZE (wide, very faint) ----
        const hazeGrad = ctx.createRadialGradient(cx, cy, bhR, cx, cy, bhR * 7);
        hazeGrad.addColorStop(0,    `rgba(255,255,255,${0.08 * bhVis})`);
        hazeGrad.addColorStop(0.3,  `rgba(255,255,255,${0.04 * bhVis})`);
        hazeGrad.addColorStop(0.7,  `rgba(255,255,255,${0.01 * bhVis})`);
        hazeGrad.addColorStop(1,    "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(cx, cy, bhR * 7, 0, Math.PI * 2);
        ctx.fillStyle = hazeGrad;
        ctx.fill();

        // ---- MAIN GLOW RING (medium) ----
        const glowGrad = ctx.createRadialGradient(cx, cy, bhR * 0.9, cx, cy, bhR * 3.5);
        glowGrad.addColorStop(0,    `rgba(255,255,255,${0.35 * bhVis})`);
        glowGrad.addColorStop(0.15, `rgba(255,255,255,${0.25 * bhVis})`);
        glowGrad.addColorStop(0.5,  `rgba(255,255,255,${0.08 * bhVis})`);
        glowGrad.addColorStop(1,    "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(cx, cy, bhR * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        // ---- ACCRETION DISK (flattened ellipse, squished) ----
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(1, 0.22);
        // Animated inner bright band
        const diskRot = t * 0.4;
        ctx.rotate(diskRot);
        const diskGrad = ctx.createRadialGradient(0, 0, bhR * 0.95, 0, 0, bhR * 2.8);
        diskGrad.addColorStop(0,    `rgba(255,255,255,${0.85 * bhVis})`);
        diskGrad.addColorStop(0.12, `rgba(255,255,255,${0.55 * bhVis})`);
        diskGrad.addColorStop(0.35, `rgba(255,255,255,${0.20 * bhVis})`);
        diskGrad.addColorStop(0.7,  `rgba(255,255,255,${0.06 * bhVis})`);
        diskGrad.addColorStop(1,    "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(0, 0, bhR * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = diskGrad;
        ctx.fill();
        ctx.restore();

        // ---- GRAVITATIONAL LENSING ARCS (above and below) ----
        // Top arc — light from behind bent over the top
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, bhR * 1.08, Math.PI + 0.2, Math.PI * 2 - 0.2);
        ctx.strokeStyle = `rgba(255,255,255,${0.6 * bhVis})`;
        ctx.lineWidth = 2 + approachP * 3;
        ctx.stroke();
        ctx.restore();
        // Bottom arc
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, bhR * 1.08, 0.2, Math.PI - 0.2);
        ctx.strokeStyle = `rgba(255,255,255,${0.5 * bhVis})`;
        ctx.lineWidth = 1.5 + approachP * 2;
        ctx.stroke();
        ctx.restore();

        // ---- PHOTON RING (brightest ring, tight to event horizon) ----
        // Animated brightness pulse
        const pulse = 0.8 + 0.2 * Math.sin(t * 3);
        const photonGrad = ctx.createRadialGradient(cx, cy, bhR * 0.96, cx, cy, bhR * 1.18);
        photonGrad.addColorStop(0,    `rgba(255,255,255,0)`);
        photonGrad.addColorStop(0.35, `rgba(255,255,255,${pulse * bhVis})`);
        photonGrad.addColorStop(0.55, `rgba(255,255,255,${0.85 * pulse * bhVis})`);
        photonGrad.addColorStop(1,    `rgba(255,255,255,0)`);
        ctx.beginPath();
        ctx.arc(cx, cy, bhR * 1.18, 0, Math.PI * 2);
        ctx.fillStyle = photonGrad;
        ctx.fill();

        // ---- EVENT HORIZON (perfectly black disk) ----
        ctx.beginPath();
        ctx.arc(cx, cy, bhR * 0.97, 0, Math.PI * 2);
        ctx.fillStyle = "#000";
        ctx.fill();

        // ---- ORBITING PARTICLES ----
        const orbitCount = 80;
        for (let i = 0; i < orbitCount; i++) {
          const f = i / orbitCount;
          const ang = f * Math.PI * 2 + t * (1.5 + f * 0.8);
          // Slightly elliptical orbit
          const pr = bhR * (1.15 + (i % 5) * 0.18);
          const px = cx + Math.cos(ang) * pr;
          const py = cy + Math.sin(ang) * pr * 0.28;
          ctx.beginPath();
          ctx.arc(px, py, 0.8 + f * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${(0.3 + f * 0.3) * bhVis})`;
          ctx.fill();
        }
      }

      // ---- ENTRY: white flash → full blackout ----
      if (entryP > 0) {
        // Flash as we cross the event horizon
        const flash = Math.sin(smooth(entryP, 0, 0.4) * Math.PI) * 0.7;
        if (flash > 0) {
          ctx.fillStyle = `rgba(255,255,255,${flash})`;
          ctx.fillRect(0, 0, W, H);
        }
        // Then complete darkness (inside the BH)
        const blackout = smooth(entryP, 0.35, 1.0);
        if (blackout > 0) {
          ctx.fillStyle = `rgba(0,0,0,${blackout})`;
          ctx.fillRect(0, 0, W, H);
        }
      }

      // ---- SCROLL HINT ----
      if (p < 0.04) {
        const a = (1 - p / 0.04) * 0.3;
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.font = "10px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("SCROLL TO ENTER", cx, H - 32);
      }
    }

    draw();

    return () => {
      cancelAnimationFrame(animIdRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block" style={{ background: "#000" }} />
      </div>
    </section>
  );
}
