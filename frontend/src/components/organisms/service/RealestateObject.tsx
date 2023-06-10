import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { useCreate3DObject } from "@/src/hooks/service/Create3DObject";
import { COLORS } from "@/src/utils/values/color";

type GLTFResult = GLTF & {
  nodes: {
    Circle003: THREE.Mesh;
    Circle003_1: THREE.Mesh;
  };
  materials: {
    ["Color - Purple.001"]: THREE.MeshStandardMaterial;
    ["Silver Metal.003"]: THREE.MeshStandardMaterial;
  };
};

interface IRealestateObject {
  position: [number, number, number];
  handleClick: (gltfObject: THREE.Group) => void;
}
const RealestateObject = ({ position, handleClick }: IRealestateObject) => {
  const gltfRef = useRef<THREE.Group>();

  const { gltf, materials, nodes } = useCreate3DObject<GLTFResult>(
    "real-estate",
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
        geometry={nodes.Circle003.geometry}
        material={
          new THREE.MeshStandardMaterial({
            color: COLORS["danggn-orange"],
          })
        }
      />
      <mesh
        geometry={nodes.Circle003_1.geometry}
        material={
          new THREE.MeshStandardMaterial({
            color: COLORS["danggn-darkgray"],
          })
        }
      />
    </group>
  );
};

useGLTF.preload("/3d/real-estate.glb");

export default RealestateObject;
