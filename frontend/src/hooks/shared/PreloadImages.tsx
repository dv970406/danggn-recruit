import {} from "next/navigation";
import { useEffect } from "react";

export const usePreloadImages = (folderPath: string, sources: string[]) => {
  // useEffect(() => {
  //   console.log(window.origin);
  //   sources.forEach((source) => {
  //     const img = new Image();
  //     img.src = `${window.origin}/${folderPath}/${source}`;
  //   });
  // }, []);

  useEffect(() => {
    const parallel = async () => {
      const promises = sources.map((source) => {
        const img = new Image();
        img.src = `${window.origin}/${folderPath}/${source}`;
      });

      await Promise.all(promises);
    };
    parallel();
  }, []);
};
