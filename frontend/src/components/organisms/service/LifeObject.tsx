import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { useCreate3DObject } from "@/src/hooks/service/Create3DObject";
import { COLORS } from "@/src/utils/values/color";

type GLTFResult = GLTF & {
  nodes: {
    chain: THREE.Mesh;
  };
  materials: {
    ["Color - Red.004"]: THREE.MeshStandardMaterial;
  };
};

// 동네생활용 3D 오브젝트
interface ILifeObject {
  position: [number, number, number];
  handleClick: (gltfObject: THREE.Group) => void;
}
const LifeObject = ({ position, handleClick }: ILifeObject) => {
  const gltfRef = useRef<THREE.Group>();

  const { gltf, materials, nodes } = useCreate3DObject<GLTFResult>(
    "life",
    gltfRef
  );
  return (
    <group
      // @ts-ignore
      ref={gltfRef}
      position={position}
      dispose={null}
      onClick={() => handleClick(gltf)}
      scale={[1, 1, 1]}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      <mesh
        geometry={nodes.chain.geometry}
        material={
          new THREE.MeshStandardMaterial({
            color: COLORS["danggn-orange"],
          })
        }
        position={[0, 0.005, 0]}
        rotation={[Math.PI / 2, -Math.PI / 4, Math.PI / 4]}
      />
    </group>
  );
};

useGLTF.preload("/3d/life.glb");

export default LifeObject;
