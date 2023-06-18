import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { serviceIdState } from "@/src/utils/recoil/service";
import { gsap } from "gsap";

export const useClick3DObject = () => {
  const [clickedObject, setClickedObject] = useState<THREE.Group | undefined>(
    undefined
  );

  const [beforePositionOfTarget, setBeforePositionOfTarget] =
    useState<THREE.Vector3>();

  const setServiceId = useSetRecoilState(serviceIdState);
  const [canClick, setCanClick] = useState(false);

  const handleClick = (gltfObject: THREE.Group) => {
    if (clickedObject && beforePositionOfTarget) {
      // 어떤 오브젝트가 올라가고 있을 때 다른 오브젝트를 클릭할 수 없음
      if (!canClick) return;

      if (clickedObject.name === gltfObject.name) return;

      gsap.to(clickedObject.rotation, {
        y: 0,
        z: 0,
        x: 0,
        duration: 1,
      });

      gsap.to(clickedObject.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1,
      });

      gsap.to(clickedObject.position, {
        x: beforePositionOfTarget.x,
        y: beforePositionOfTarget.y,
        z: beforePositionOfTarget.z,
        duration: 1,
      });
    }
    setCanClick(false);
    // gltfObject는 객체이므로 참조타입이다.
    // 깊은 복사하여 값을 메모리 상에 따로 저장해놓지 않으면 이전 상태의 position이 아니라 새로운 position 값을 가지게 되므로 이전의 position인 제자리로 찾아가질 않음
    const gltfObjectPosition = { ...gltfObject?.position } as THREE.Vector3;
    setBeforePositionOfTarget(gltfObjectPosition);
    setClickedObject(gltfObject);
    setServiceId(gltfObject.name);
  };

  useEffect(() => {
    if (!clickedObject) return;
    gsap.to(clickedObject.rotation, {
      y: Math.PI * 2.1,
      x: 0,
      z: 0,
      duration: 1,
    });

    gsap.to(clickedObject.scale, {
      x: 1.5,
      y: 1.5,
      z: 1,
      duration: 1,
    });

    gsap
      .to(clickedObject.position, {
        x: 0,
        y: 4,
        z: 1,
        duration: 1,
      })
      .eventCallback("onComplete", () => setCanClick(true));
  }, [clickedObject]);

  useFrame(() => {
    if (!clickedObject || !canClick) return;
    const time = performance.now() / 1000; // 시간에 따라 변하는 값을 생성

    const yPos = Math.sin(time) * 0.25 + 4;
    clickedObject.position.y = yPos;
  });

  return {
    handleClick,
  };
};
