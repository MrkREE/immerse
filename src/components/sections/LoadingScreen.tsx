"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Universe dots background */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 80 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: Math.random() * 2 + 0.5 + "px",
                  height: Math.random() * 2 + 0.5 + "px",
                  left: Math.random() * 100 + "%",
                  top: Math.random() * 100 + "%",
                  opacity: Math.random() * 0.6 + 0.1,
                }}
                animate={{ opacity: [0, Math.random() * 0.7 + 0.1, 0] }}
                transition={{
                  duration: Math.random() * 2 + 1,
                  delay: Math.random() * 1.5,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>

          {/* Main IMMERSE logo */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-6"
            initial={{ opacity: 0, scale: 0.75, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          >
            <h1
              className="text-3d font-black tracking-tight select-none"
              style={{ fontSize: "clamp(3.5rem, 12vw, 10rem)" }}
            >
              IMMERSE
            </h1>
            <motion.p
              className="text-white/40 text-sm tracking-[0.4em] uppercase font-light"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Language · AI · Fluency
            </motion.p>
          </motion.div>

          {/* Loading bar */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 w-32 h-px bg-white/10 overflow-hidden rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-white/60 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.2, delay: 0.3, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
