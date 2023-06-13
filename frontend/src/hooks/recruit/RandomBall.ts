import {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  Mouse,
  MouseConstraint,
  Events,
} from "matter-js";
import { useSetRecoilState } from "recoil";
import { filteringRecruitPostsState } from "@/src/utils/recoil/recruit";
import { useEffect, useRef } from "react";
import { IPart } from "@/src/type/part.interface";
import { useRouter } from "next/navigation";

// 로또볼처럼 채용 파트를 굴려서 클릭하면 그 채용 정보를 볼 수 있게 할 것임
export const useRandomBall = (partsData: IPart[]) => {
  // 어떤 파트볼을 클릭했는지 저장해놓고 다른 컴포넌트에서 정보를 공유하기 위해 전역 저장
  const setFilteringRecruitPosts = useSetRecoilState(
    filteringRecruitPostsState
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);
  let engine: Engine,
    render: Render,
    runner: Runner,
    mouse: Mouse,
    mouseConstraint: MouseConstraint;

  let observer: IntersectionObserver;
  useEffect(() => {
    const canvas = canvasRef.current!;

    const cw = 1000;
    const ch = 1000;

    // Body를 만드는 함수
    const addRect = (
      x: number,
      y: number,
      w: number,
      h: number,
      options: Matter.IChamferableBodyDefinition
    ) => {
      const rect = Bodies.rectangle(x, y, w, h, options);
      Composite.add(engine.world, rect);
    };

    // canvas 세팅
    const initScene = () => {
      engine = Engine.create({
        enableSleeping: true,
      });
      render = Render.create({
        canvas,
        engine,
        options: {
          width: cw,
          height: ch,
          wireframes: false,
        },
      });
      runner = Runner.create();

      Runner.run(runner, engine);
    };
    initScene();

    // Mouse 객체 세팅
    const initMouse = () => {
      mouse = Mouse.create(canvas);
      mouseConstraint = MouseConstraint.create(engine, { mouse });
      Composite.add(engine.world, mouseConstraint);
    };
    initMouse();

    // 바닥 생성
    const initGround = () => {
      const SEGMENTS = 128;
      const deg = (Math.PI * 2) / SEGMENTS;
      const WIDTH = 60;
      const radius = cw / 2 + WIDTH / 2;
      const height = radius * Math.tan(deg / 2) * 2;

      for (let i = 0; i < SEGMENTS; i++) {
        const angle = deg * i;
        const x = radius * Math.cos(angle) + cw / 2;
        const y = radius * Math.sin(angle) + cw / 2;
        addRect(x, y, 50, height, {
          isStatic: true,
          angle,
          render: { lineWidth: 15 },
        });
      }

      const ground = Bodies.rectangle(cw / 2, ch, cw, 50, { isStatic: true });
      Composite.add(engine.world, ground);
    };
    initGround();

    // 채용 파트의 이미지가 삽입된 Body 박스 생성
    const getRandomRecruitPartBalls = async () => {
      const SCALE = 0.7;
      const TYPE_SQUARE = { w: 152 * SCALE, h: 152 * SCALE };

      partsData?.forEach(({ partName }) => {
        // 첫 위치를 랜덤으로 소환
        const randomWidthPosition = Math.round((Math.random() - 0.5) * 50);
        const randomHeightPosition = Math.round((Math.random() - 0.5) * 50);

        return addRect(
          cw / 2 + randomWidthPosition,
          ch / 2 + randomHeightPosition,
          TYPE_SQUARE.w,
          TYPE_SQUARE.h,
          {
            // label은 id 용도로, State에서 식별자 용도로 사용하기 위함
            label: partName,

            // champfer는 보이지 않는 공간을 Radius로 깎아주기 위함
            chamfer: {
              radius: 20,
            },

            // 파트볼에 이미지를 씌움
            render: {
              sprite: {
                texture: `/recruit-part/${partName}.png`,
                xScale: SCALE,
                yScale: SCALE,
              },
            },
          }
        );
      });
    };
    getRandomRecruitPartBalls();

    // 컴퓨터 자원 낭비를 막기 위해 스크롤이 들어왔을 때 Matter를 실행시킬 것이다.
    const playAnimationWhenInSight = () => {
      observer = new IntersectionObserver(
        (entries) => {
          const canvasEntry = entries[0];
          if (canvasEntry.isIntersecting) {
            runner.enabled = true;
            Render.run(render);
          } else {
            runner.enabled = false;
            Render.stop(render);
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(canvas);
    };
    playAnimationWhenInSight();

    const gravityPower = 0.5;
    let gravityDeg = 0;

    // 드럼세탁기 애니메이션
    // tick은 Matter에서 requestAnimationFrame역할
    Events.on(runner, "tick", () => {
      gravityDeg += 1;
      engine.gravity.x = gravityPower * Math.cos((Math.PI / 180) * gravityDeg);
      engine.gravity.y = gravityPower * Math.sin((Math.PI / 180) * gravityDeg);
    });

    // 파트볼을 클릭했을 때 해당 파트의 채용공고를 보여주는 리스트로 이동
    const moveScrollSmoothly = (event: MouseEvent) => {
      // 순간이동하는 스크롤을 막고 Body를 클릭했을 때 계속 mousedown 상태로 Body가 끌려다니는 것을 방지하기 위함
      event.preventDefault();

      document
        .getElementById(`if-click-ball-will-be-move-to-here`)
        ?.scrollIntoView({ behavior: "smooth" });
    };

    Events.on(mouseConstraint, "mousedown", () => {
      const selectedPartName = mouseConstraint?.body?.label || "";
      if (!selectedPartName) return;
      // 클릭한 파트볼의 파트 식별자를 전역적으로 저장함
      setFilteringRecruitPosts((prev) => ({
        ...prev,
        partName: selectedPartName,
      }));

      // 채용공고 리스트 section의 id로 이동한다.
      const newATag = document.createElement("a");
      newATag.href = `#if-click-ball-will-be-move-to-here`;

      // smooth한 이동을 위한 코드
      newATag.addEventListener("click", moveScrollSmoothly);
      newATag.click();

      return () => {
        newATag.removeEventListener("click", moveScrollSmoothly);
        newATag.remove();
      };
    });

    return () => {
      observer.unobserve(canvas);
      // composite의 동적 개체만 제거하고 정적 개체는 유지
      Composite.clear(engine.world, false);
      Mouse.clearSourceEvents(mouse);
      Runner.stop(runner);
      Render.stop(render);
      Engine.clear(engine);
    };
  }, []);

  return { canvasRef };
};
