import React from "react";

interface IImagePreLoader {
  children: React.ReactNode;
}

const serviceSources = [
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
];

const icons3DSources = [
  // clay.png는 분기처리중 true에 속하므로 <Image/>태그가 알아서 스크롤이 다와갈떄쯤 preload해줄 것임
  "advertisement-gradient.png",
  "brand-profile-gradient.png",
  "business-gradient.png",
  "car-gradient.png",
  "coworker-gradient.png",
  "growup-gradient.png",
  "judgement-gradient.png",
  "life-gradient.png",
  "part-time-job-gradient.png",
  "pay-gradient.png",
  "profile-gradient.png",
  "real-estate-gradient.png",
  "respect-gradient.png",
  "self-gradient.png",
  "share-gradient.png",
  "store-gradient.png",
  "team-gradient.png",
  "trade-gradient.png",
  "trust-gradient.png",
];
const ImagePreLoader = async ({ children }: IImagePreLoader) => {
  const servicePromises = serviceSources.map((source) => {
    const img = new Image();
    img.src = `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://danggn-recruit.vercel.app/"
    }/service/${source}`;
  });
  const icons3DPromises = icons3DSources.map((source) => {
    const img = new Image();
    img.src = `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://danggn-recruit.vercel.app/"
    }/3d-icons/${source}`;
  });

  await Promise.all([servicePromises, icons3DPromises]);

  return <>{children}</>;
};

export default ImagePreLoader;
