import React, { useRef } from "react";
import { useFBX } from "@react-three/drei";
import { Object3D } from "three";

interface IInteractiveObject {
  url: string;
  position: [number, number, number];
  handleClick: (fbxObject: THREE.Object3D<THREE.Event>) => void;
}

// 미사용
// 겪어본 사실인데 웹에 로드할거면 FBX 사용하지말고 GLTF포맷 사용하자.
// 이유는 모르겠지만 FBX 사용했을 때 끔찍하게 느려졌음
const InteractiveObject = ({
  url,
  position,
  handleClick,
}: IInteractiveObject) => {
  const fbxObjectGroup = useFBX(url);
  const fbxObject = fbxObjectGroup.children[0];

  const fbxRef = useRef();

  const fbx = fbxRef.current! as THREE.Object3D<THREE.Event>;

  return (
    <primitive
      object={fbxObject}
      position={position}
      ref={fbxRef}
      onClick={() => handleClick(fbx)}
      scale={[1, 1, 1]}
    />
  );
};

export default React.memo(InteractiveObject);
