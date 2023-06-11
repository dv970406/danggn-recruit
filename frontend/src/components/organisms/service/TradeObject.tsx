import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useCreate3DObject } from "@/src/hooks/service/Create3DObject";
import { COLORS } from "@/src/utils/values/color";

type GLTFResult = GLTF & {
  nodes: {
    Cube011: THREE.Mesh;
    Cube011_1: THREE.Mesh;
  };
  materials: {
    ["Color - Blue"]: THREE.MeshStandardMaterial;
    ["Color - Red.003"]: THREE.MeshStandardMaterial;
  };
};

// 중고거래용 3D 오브젝트
interface IStarObject {
  position: [number, number, number];
  handleClick: (gltfObject: THREE.Group) => void;
}
const TradeObject = ({ handleClick, position }: IStarObject) => {
  const gltfRef = useRef<THREE.Group>();

  const { gltf, materials, nodes } = useCreate3DObject<GLTFResult>(
    "trade",
    gltfRef
  );

  return (
    <group
      // @ts-ignore
      ref={gltfRef}
      position={position}
      onClick={() => handleClick(gltf)}
      dispose={null}
      scale={[1, 1, 1]}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      <group position={[0.395, 0.213, -0.342]} scale={0.874}>
        <mesh
          geometry={nodes.Cube011.geometry}
          material={
            new THREE.MeshStandardMaterial({
              color: COLORS["danggn-orange"],
            })
          }
        />
        <mesh
          geometry={nodes.Cube011_1.geometry}
          material={
            new THREE.MeshStandardMaterial({
              color: COLORS["danggn-darkgray"],
            })
          }
        />
      </group>
    </group>
  );
};

useGLTF.preload("/3d/trade.glb");

export default TradeObject;
