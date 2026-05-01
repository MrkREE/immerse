"use client";
import dynamic from "next/dynamic";

const BlackHoleTransition = dynamic(
  () => import("@/components/sections/BlackHoleTransition"),
  { ssr: false }
);

export default function BlackHoleWrapper() {
  return <BlackHoleTransition />;
}
