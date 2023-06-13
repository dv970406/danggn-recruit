"use client";

import React from "react";
import { usePreloadImages } from "../hooks/shared/PreloadImages";

interface IImagePreLoader {
  children: React.ReactNode;
}
const ImagePreLoader = ({ children }: IImagePreLoader) => {
  usePreloadImages("/service", [
    "/car-symbol.png",
    "/car.png",
    "/life-symbol.png",
    "/life.png",
    "/part-time-job.png",
    "/part-time-job-symbol.png",
    "/pay.png",
    "/pay-symbol.png",
    "/real-estate-symbol.png",
    "/real-estate.png",
    "/store.png",
    "/store-symbol.png",
    "/trade.png",
    "/trade-symbol.png",
  ]);
  usePreloadImages("/3d-icons", [
    "advertisement-clay.png",
    "advertisement-gradient.png",
    "brand-profile-clay.png",
    "brand-profile-gradient.png",
    "business-clay.png",
    "business-gradient.png",
    "car-clay.png",
    "car-gradient.png",
    "coworker-clay.png",
    "coworker-gradient.png",
    "growup-clay.png",
    "growup-gradient.png",
    "judgement-clay.png",
    "judgement-gradient.png",
    "life-clay.png",
    "life-gradient.png",
    "part-time-job-clay.png",
    "part-time-job-gradient.png",
    "pay-clay.png",
    "pay-gradient.png",
    "profile-clay.png",
    "profile-gradient.png",
    "real-estate-clay.png",
    "real-estate-gradient.png",
    "respect-clay.png",
    "respect-gradient.png",
    "self-clay.png",
    "self-gradient.png",
    "share-clay.png",
    "share-gradient.png",
    "store-clay.png",
    "store-gradient.png",
    "team-clay.png",
    "team-gradient.png",
    "trade-clay.png",
    "trade-gradient.png",
    "trust-clay.png",
    "trust-gradient.png",
  ]);
  return <>{children}</>;
};

export default ImagePreLoader;
