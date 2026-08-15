"use client";

import Lottie from "lottie-react";
import lotusAnimation from "@/assets/lotus.json";

export function LottieLotus() {
  return (
    <Lottie
      animationData={lotusAnimation}
      loop
      className="w-full h-full"
      aria-label="Swargiri breathing pulse"
    />
  );
}
