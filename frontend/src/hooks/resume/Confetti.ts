import Particle from "@/src/components/organisms/resume/Particle";
import { useEffect, useRef } from "react";
import { COLORS } from "../../utils/values/color";

interface IConfetti {
  x: number;
  y: number;
  count: number;
  deg: number;
  spread?: number;
}

// 빵빠레 로직처리 훅
export const useConfetti = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const particles: Particle[] = [];

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio > 1 ? 2 : 1;
    let canvasWidth = document.documentElement.clientWidth;
    let canvasHeight = document.documentElement.clientHeight;

    const interval = 1000 / 60;

    const init = () => {
      canvasWidth = document.documentElement.clientWidth;
      canvasHeight = document.documentElement.clientHeight;
      canvas.style.width = canvasWidth + "px";
      canvas.style.height = canvasHeight + "px";
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      ctx.scale(dpr, dpr);
    };

    // 콘페티에서 당근 컬러가 최대한 많이 나오게 확률을 높이기 위해 여러번 작성
    const colors = [
      COLORS["danggn-orange"],
      COLORS["danggn-orange"],
      COLORS["danggn-orange"],
      COLORS["danggn-orange"],
      COLORS["danggn-orange"],
      COLORS["danggn-orange"],
      COLORS["danggn-darkgray"],
      COLORS["danggn-lightgray"],
    ];
    const shapes = ["circle", "square"];
    const confetti = ({ x, y, count, deg, spread }: IConfetti) => {
      for (let i = 0; i < count; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        particles.push(new Particle(x, y, deg, color, shape, spread));
      }
    };

    const render = () => {
      let now = 0,
        delta;
      let then = Date.now();
      const INIT_TIME = Date.now();

      let deg = 0;

      const frame = () => {
        const confettiAnimation = requestAnimationFrame(frame);
        now = Date.now();
        delta = now - then;
        if (delta < interval) return;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        deg += 1;

        // 콘페티를 5초동안만 뿌리기 위함
        if (now - INIT_TIME <= 5000) {
          confetti({
            x: 0,
            y: 0.8,
            count: 6,
            deg: -50,
          });

          confetti({
            x: 1,
            y: 0.8,
            count: 6,
            deg: -130,
          });
        }

        // 콘페티를 5초동안 뿌리는데 바로 애니메이션이 멈추면 부자연스러우므로 12초 후에 cancelAnimationFrame를 하는 것임
        if (now - INIT_TIME >= 12000) {
          cancelAnimationFrame(confettiAnimation);
        }

        for (let i = particles.length - 1; i >= 0; i--) {
          particles[i].update();
          particles[i].draw(ctx);

          if (particles[i].opacity < 0) particles.splice(i, 1);
          if (particles[i]?.y > canvasHeight) particles.splice(i, 1);
        }

        then = now - (delta % interval);
      };

      requestAnimationFrame(frame);
    };

    window.addEventListener("resize", init);

    init();
    render();
  }, []);

  return { canvasRef };
};
