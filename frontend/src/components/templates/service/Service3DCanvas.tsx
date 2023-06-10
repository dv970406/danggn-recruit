"use client";
import React from "react";
import RealestateObject from "../../organisms/service/RealestateObject";
import PayObject from "../../organisms/service/PayObject";
import LifeObject from "../../organisms/service/LifeObject";
import StoreObject from "../../organisms/service/StoreObject";
import PartTimeJobObject from "../../organisms/service/PartTimeJobObject";
import CarObject from "../../organisms/service/CarObject";
import TradeObject from "../../organisms/service/TradeObject";
import { use3DObject } from "@/src/hooks/service/Click3DObject";

const Service3DCanvas = () => {
  const { handleClick } = use3DObject();

  return (
    <>
      <ambientLight color={0xffffff} intensity={0.7} />

      <TradeObject position={[-7.5, -7.5, -2]} handleClick={handleClick} />
      <LifeObject position={[-5, -7.5, -2]} handleClick={handleClick} />
      <StoreObject position={[-2.5, -7.5, -2]} handleClick={handleClick} />
      <PartTimeJobObject position={[0, -7.5, -2]} handleClick={handleClick} />
      <RealestateObject position={[2.5, -7.5, -2]} handleClick={handleClick} />
      <CarObject position={[5, -7.5, -2]} handleClick={handleClick} />
      <PayObject position={[7.5, -7.5, -2]} handleClick={handleClick} />
    </>
  );
};

export default Service3DCanvas;
