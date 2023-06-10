"use client";

import React from "react";
import { useGLTF } from "@react-three/drei";
import DanggnObject from "../../organisms/home/DanggnObject";

const Danggn3DCanvas = () => {
  return (
    <>
      <ambientLight color={0xffffff} intensity={0.3} />

      <DanggnObject />
    </>
  );
};

useGLTF.preload("/3d/danggn.glb");

export default Danggn3DCanvas;
