"use client";

import React, { useEffect, useRef } from "react";

import { IPart } from "@/src/type/part.interface";
import { useRandomBall } from "@/src/hooks/recruit/RandomBall";

interface IRandomBall {
  partsData: IPart[];
}
const RandomBall = ({ partsData }: IRandomBall) => {
  const { canvasRef } = useRandomBall(partsData);
  return (
    <section className="flex-col w-full h-screen gap-12 px-4 pt-16 bg-danggn-orange flex-center lg:flex-row">
      <canvas
        ref={canvasRef}
        className=" w-[70vmin] h-[70vmin] rounded-full bg-black"
      />
      <div className="gap-4 column-box flex-center">
        <h2 className="text-subtitle">지원을 원하시는 파트를 골라주세요!</h2>
        <p className="text-white text-main">
          원하는 파트가 없는 경우 '공통'을 눌러주세요.
        </p>
      </div>
    </section>
  );
};

export default RandomBall;
