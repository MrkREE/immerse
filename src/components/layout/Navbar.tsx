"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { AnimatedCTAButton } from "@/components/ui/AnimatedCTAButton";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.0, duration: 0.6 }}
      >
        <motion.div
          className="max-w-7xl mx-auto flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500"
          animate={
            scrolled
              ? {
                  backgroundColor: "rgba(0,0,0,0.65)",
                  backdropFilter: "blur(24px)",
                  borderColor: "rgba(255,255,255,0.07)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
                }
              : {
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                }
          }
          style={{ border: "1px solid transparent" }}
        >
          {/* Logo */}
          <a href="/" className="text-white font-black tracking-[0.2em] text-sm uppercase">
            IMMERSE
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/50 hover:text-white text-sm transition-colors duration-200 font-light"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#"
              className="text-white/50 hover:text-white text-sm transition-colors duration-200 font-light"
            >
              Sign In
            </a>
            <AnimatedCTAButton variant="primary" className="!h-9 !text-xs !pl-4 !pr-10">
              Get Started
            </AnimatedCTAButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white/60 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col pt-24 px-6 pb-10 bg-black/95 backdrop-blur-2xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <nav className="flex flex-col gap-6 mt-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="text-white/70 text-2xl font-light"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto">
              <AnimatedCTAButton variant="primary" className="w-full justify-center">
                Get Started Free
              </AnimatedCTAButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
