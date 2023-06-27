"use client";

import React from "react";

import { IPart } from "@/src/type/part.interface";
import { useRandomBall } from "@/src/hooks/recruit/RandomBall";

interface IRandomBall {
  partsData: IPart[];
}

// /recruit
// 채용을 진행중인 파트를 로또볼처럼 굴리는 Template
const RandomBall = ({ partsData }: IRandomBall) => {
  const { canvasRef } = useRandomBall(partsData);
  return (
    <section className="flex-col w-full h-screen gap-12 px-4 pt-16 bg-danggn-orange flex-center lg:flex-row">
      <canvas
        ref={canvasRef}
        className=" w-[75vmin] h-[75vmin] rounded-full bg-black"
      />
      <div className="gap-4 column-box flex-center">
        <h2 className="text-subtitle">지원을 원하시는 파트를 골라주세요!</h2>
        <p className="text-center text-white break-words text-main">
          현재 FE(프론트엔드) 파트에만 채용공고가 등록되어 있습니다.
        </p>
        <p className="text-center text-white break-words text-main">
          무료플랜 DB이므로 슬립모드 상태일 수 있습니다. 조금만 기다려주세요.
        </p>
      </div>
    </section>
  );
};

export default RandomBall;
