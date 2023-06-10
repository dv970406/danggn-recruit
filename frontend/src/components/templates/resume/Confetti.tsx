"use client";

import React from "react";
import { useConfetti } from "@/src/hooks/resume/Confetti";

const Confetti = () => {
  const { canvasRef } = useConfetti();

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-screen h-screen"
    />
  );
};

export default Confetti;
