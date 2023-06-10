"use client";

import React from "react";
import { PARALLAX_IMAGE_LIST } from "@/src/utils/values/ParallaxImageList";
import ParallaxImageItem from "../../organisms/home/ParallaxImageItem";
import { useParallaxImages } from "@/src/hooks/home/ParallaxImages";
import { useResponsiveSize } from "@/src/hooks/shared/ResponsiveSize";
const ParallaxImages = () => {
  const { ulRef, parallaxMove, handleMouseMove } = useParallaxImages();

  const { responsiveSize } = useResponsiveSize();
  return (
    <section className="p-4">
      <ul
        className="relative h-[4500px]"
        onMouseMove={handleMouseMove}
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
