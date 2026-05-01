"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

const CHARS = [
  { char: "α",  lang: "Greek"    },
  { char: "あ", lang: "Japanese" },
  { char: "한", lang: "Korean"   },
  { char: "أ",  lang: "Arabic"   },
  { char: "आ", lang: "Hindi"    },
  { char: "中", lang: "Chinese"  },
  { char: "Ш",  lang: "Russian"  },
  { char: "β",  lang: "Greek"    },
  { char: "ع",  lang: "Arabic"   },
  { char: "字", lang: "Chinese"  },
  { char: "ñ",  lang: "Spanish"  },
  { char: "ご", lang: "Japanese" },
  { char: "가", lang: "Korean"   },
  { char: "Ω",  lang: "Greek"    },
  { char: "क",  lang: "Hindi"    },
  { char: "я",  lang: "Russian"  },
];

const POSITIONS = [
  { x: 8,  y: 12 }, { x: 82, y: 8  }, { x: 15, y: 78 },
  { x: 88, y: 72 }, { x: 45, y: 6  }, { x: 5,  y: 45 },
  { x: 90, y: 35 }, { x: 60, y: 85 }, { x: 28, y: 55 },
  { x: 72, y: 20 }, { x: 35, y: 88 }, { x: 55, y: 15 },
  { x: 18, y: 30 }, { x: 78, y: 55 }, { x: 48, y: 72 },
  { x: 65, y: 42 },
];

// All chars are large enough to be easy targets
const SIZES = [
  "text-5xl", "text-6xl", "text-4xl", "text-5xl", "text-6xl",
  "text-5xl", "text-4xl", "text-6xl", "text-5xl", "text-5xl",
  "text-4xl", "text-6xl", "text-5xl", "text-6xl", "text-5xl", "text-5xl",
];

const DELAYS    = [0,   1.2, 2.4, 0.6, 1.8, 3.0, 0.3, 2.1, 1.5, 0.9, 2.7, 0.1, 1.3, 2.0, 0.7, 1.6];
const DURATIONS = [8,   10,  7,   11,  9,   8.5, 12,  7.5, 10.5,9.5, 8,   11,  7,   10,  9,   8  ];

function FloatingChar({
  item,
  i,
  containerRef,
}: {
  item: { char: string; lang: string };
  i: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);

  return (
    <motion.div
      className={`absolute font-bold text-white select-none ${SIZES[i]}`}
      style={{
        left: `${POSITIONS[i].x}%`,
        top: `${POSITIONS[i].y}%`,
        fontFamily: "var(--font-geist-sans)",
        cursor: dragging ? "grabbing" : "grab",
        zIndex: dragging ? 60 : 10,
        userSelect: "none",
        touchAction: "none",
      }}
      // ── Float animation (always running) ──────────────────────────
      animate={{
        scale:   [1,    1.06, 0.97, 1   ],
        opacity: [0.40, 0.75, 0.50, 0.40],   // never below 0.4 → always hoverable
        rotate:  [0,    4,    -3,   0   ],
        y:       [0,    -22,  -8,   0   ],
      }}
      transition={{
        duration: DURATIONS[i],
        delay: DELAYS[i],
        repeat: Infinity,
        ease: "easeInOut",
      }}
      // ── Hover: overrides animate (highest priority in Framer Motion) ──
      whileHover={{
        scale: 1.75,
        opacity: 1,
        rotate: 0,
        filter: "drop-shadow(0 0 18px rgba(255,255,255,0.95)) drop-shadow(0 0 50px rgba(255,255,255,0.55))",
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      // ── Drag ──────────────────────────────────────────────────────
      drag
      dragMomentum={false}
      dragElastic={0.05}
      dragConstraints={containerRef}
      whileDrag={{
        scale: 1.4,
        opacity: 0.9,
        filter: "drop-shadow(0 0 12px rgba(255,255,255,0.8))",
        transition: { duration: 0.15 },
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onDragStart={() => { setDragging(true); setHovered(false); }}
      onDragEnd={() => setDragging(false)}
    >
      {item.char}

      {/* Language tooltip — shown on hover */}
      <AnimatePresence>
        {hovered && !dragging && (
          <motion.span
            key="tip"
            initial={{ opacity: 0, y: 6, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute top-full mt-2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.35em] text-white/80"
            style={{ left: "50%", transform: "translateX(-50%)" }}
          >
            {item.lang}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FloatingChars() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden="true">
      {CHARS.map((item, i) => (
        <FloatingChar key={i} item={item} i={i} containerRef={containerRef} />
      ))}
    </div>
  );
}
