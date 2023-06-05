"use client";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import Loader from "../../atomics/Loader";
import { Html, useProgress } from "@react-three/drei";
import { Vector3 } from "three";

interface ICanvasWrapper {
  children: React.ReactNode;
}
const CanvasWrapper = ({ children }: ICanvasWrapper) => {
  let clientWidth = 1920,
    clientHeight = 1024;

  useEffect(() => {
    clientWidth = document.documentElement.clientWidth;
    clientHeight = document.documentElement.clientHeight;
  }, []);

  const { progress } = useProgress();

  return (
    <section className="hidden lg:block">
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
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
          paddingTop: 56, // tailwind 기준 pt-14 === 56px
        }}
      >
        {/* 로딩바는 SSR에서는 소용없긴 할듯 */}
        {progress !== 100 && (
          <Html position={[0, -7.5, 0]}>
            <Loader />
          </Html>
        )}

        <directionalLight
          position={[1, 1, 1]}
          color={0xffffff}
          intensity={0.1}
        />
        <directionalLight
          position={[0.5, 2, 1]}
          color={0xffffff}
          intensity={0.2}
        />
        {children}
      </Canvas>
    </section>
  );
};

export default CanvasWrapper;
