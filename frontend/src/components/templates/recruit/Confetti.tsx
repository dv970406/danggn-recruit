"use client";

import React from "react";
import { useConfetti } from "@/src/hooks/resume/Confetti";

// /recruit/:recruitPostId/apply/success
// 지원에 성공했을 때 지원정보 요약과 함께 빵빠레를 터트리는 Template
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
