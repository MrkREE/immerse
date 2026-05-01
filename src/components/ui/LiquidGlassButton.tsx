"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LiquidGlassButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
}

export function LiquidGlassButton({
  children,
  variant = "ghost",
  size = "md",
  className,
  onClick,
  type = "button",
}: LiquidGlassButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variantClasses = {
    primary: [
      "bg-white text-black font-semibold",
      "shadow-[0_0_40px_rgba(255,255,255,0.25),0_0_80px_rgba(255,255,255,0.08)]",
      "hover:shadow-[0_0_60px_rgba(255,255,255,0.45),0_0_120px_rgba(255,255,255,0.15)]",
    ].join(" "),
    ghost: [
      "bg-white/5 text-white font-medium border border-white/10",
      "backdrop-blur-xl",
      "hover:bg-white/10 hover:border-white/20",
    ].join(" "),
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full font-sans",
        "transition-all duration-300 cursor-pointer select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </motion.button>
  );
}
