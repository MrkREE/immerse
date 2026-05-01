"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function VideoScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0.05, 0.55], [0.22, 1]);
  const borderRadius = useTransform(scrollYProgress, [0.05, 0.5], [28, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0.05, 0.3], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[220vh]">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Outer glow ring that shrinks as video expands */}
        <motion.div
          className="relative"
          style={{ scale }}
        >
          {/* Glow behind video */}
          <div
            className="absolute -inset-4 rounded-3xl pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />

          <motion.div
            className="relative overflow-hidden"
            style={{ borderRadius }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-[88vw] max-w-5xl h-[58vh] object-cover block"
              style={{ display: "block" }}
            >
              <source
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                type="video/mp4"
              />
            </video>

            {/* Overlay content */}
            <motion.div
              className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-4"
              style={{ opacity: overlayOpacity }}
            >
              <p className="text-white/40 text-xs tracking-[0.4em] uppercase">
                See it in action
              </p>
              <h2 className="text-white text-3xl md:text-5xl font-bold text-center px-8">
                Real conversations.<br />Real progress.
              </h2>
            </motion.div>

            {/* Glass border shimmer */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1)",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
