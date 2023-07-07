"use client";

import React from "react";
import ParallaxImageItem from "../../organisms/home/ParallaxImageItem";
import { useParallaxImages } from "@/src/hooks/home/ParallaxImages";
import { useResponsiveSize } from "@/src/hooks/shared/ResponsiveSize";
import { PARALLAX_IMAGE_LIST } from "@/src/jsons/ParallaxImageList";

// HomePage의 패럴랙스 이미지 Template
const ParallaxImages = () => {
  const { ulRef, parallaxMove, handleMouseMove } = useParallaxImages();

  const { responsiveSize } = useResponsiveSize();
  return (
    <section className="p-4">
      <ul
        className="relative h-[4500px]"
        // react식 이벤트 작성은 언마운트될때 해제를 알아서 해줌
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
        ref={ulRef}
      >
        {PARALLAX_IMAGE_LIST.map((image) => (
          <ParallaxImageItem
            key={image.src}
            src={image.src}
            alt={image.alt}
            parallaxMove={parallaxMove}
            position={
              responsiveSize !== "sm"
                ? image.normalPosition
                : image.mobilePosition
            }
          />
        ))}
      </ul>
    </section>
  );
};

export default ParallaxImages;
