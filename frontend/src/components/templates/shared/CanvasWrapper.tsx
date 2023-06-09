"use client";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import Loader from "../../atomics/Loader";
import { Html, useProgress } from "@react-three/drei";
import { COLORS } from "@/src/utils/values/color";

interface ICanvasWrapper {
  children: React.ReactNode;
}

// react-three/fiber중에는 반드시 Canvas 태그 안에서 사용해야 하는 기능들이 존재해서 그 것을 감쌀 Wrapper 컴포넌트
const CanvasWrapper = ({ children }: ICanvasWrapper) => {
  let clientWidth = 1920,
    clientHeight = 1024;

  useEffect(() => {
    clientWidth = document.documentElement.clientWidth;
    clientHeight = document.documentElement.clientHeight;
  }, []);

  const { progress } = useProgress();

  return (
    <section className="absolute top-0 hidden w-full h-screen bg-white lg:block">
      <Canvas
        dpr={[1, 2]}
        performance={{ min: 0.1, max: 1 }}
        camera={{
          fov: 75,
          aspect: clientWidth / clientHeight,
          near: 0.1,
          far: 1000,
          position: [0, 0, 10],
        }}
        className="z-10 h-full"
      >
        {/* 로딩바는 SSR에서는 소용없긴 할듯 */}
        {progress !== 100 && (
          <Html position={[0, -7.5, 0]}>
            <Loader color={COLORS["danggn-orange"]} />
          </Html>
        )}

        <directionalLight
          position={[1, 1, 1]}
          color={0xffffff}
          intensity={0.2}
        />

        <directionalLight
          position={[0.5, 2, 1]}
          color={0xffffff}
          intensity={0.1}
        />
        {children}
      </Canvas>
    </section>
  );
};

export default CanvasWrapper;
