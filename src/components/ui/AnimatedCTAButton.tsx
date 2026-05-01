"use client";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedCTAButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
}

export function AnimatedCTAButton({
  children,
  className,
  onClick,
  variant = "primary",
}: AnimatedCTAButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center",
        "text-sm font-semibold rounded-full h-12",
        "pl-6 pr-14 overflow-hidden cursor-pointer",
        "group transition-all duration-500",
        "hover:pl-14 hover:pr-6",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
        isPrimary
          ? "bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]"
          : "bg-white/8 text-white border border-white/12 hover:bg-white/14",
        className
      )}
    >
      <span className="relative z-10 transition-all duration-500 whitespace-nowrap">
        {children}
      </span>
      <div
        className={cn(
          "absolute right-1 w-10 h-10 rounded-full",
          "flex items-center justify-center",
          "transition-all duration-500",
          "group-hover:right-[calc(100%-44px)] group-hover:rotate-45",
          isPrimary ? "bg-black text-white" : "bg-white/10 text-white"
        )}
      >
        <ArrowUpRight size={16} />
      </div>
    </button>
  );
}
