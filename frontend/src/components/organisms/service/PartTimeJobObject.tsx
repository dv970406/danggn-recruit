import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { useCreate3DObject } from "@/src/hooks/service/Create3DObject";
import { COLORS } from "@/src/utils/values/color";

type GLTFResult = GLTF & {
  nodes: {
    Plane008: THREE.Mesh;
    Plane008_1: THREE.Mesh;
    Plane008_2: THREE.Mesh;
  };
  materials: {
    ["Color - Green Gradient"]: THREE.MeshStandardMaterial;
    ["Color - Yellow.002"]: THREE.MeshStandardMaterial;
    ["Silver.001"]: THREE.MeshStandardMaterial;
  };
};

interface IPartTImeJobObject {
  position: [number, number, number];
  handleClick: (gltfObject: THREE.Group) => void;
}

// 당근알바용 3D 오브젝트
const PartTimeJobObject = ({ position, handleClick }: IPartTImeJobObject) => {
  const gltfRef = useRef<THREE.Group>();

  const { gltf, materials, nodes } = useCreate3DObject<GLTFResult>(
    "part-time-job",
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
      <group rotation={[Math.PI / 2, 0, -0.274]}>
        <mesh
          geometry={nodes.Plane008.geometry}
          material={
            new THREE.MeshStandardMaterial({
              color: COLORS["danggn-orange"],
            })
          }
        />
        <mesh
          geometry={nodes.Plane008_1.geometry}
          material={
            new THREE.MeshStandardMaterial({
              color: COLORS["danggn-lightgray"],
            })
          }
        />
        <mesh
          geometry={nodes.Plane008_2.geometry}
          material={
            new THREE.MeshStandardMaterial({
              color: COLORS["danggn-orange"],
            })
          }
        />
      </group>
    </group>
  );
};

useGLTF.preload("/3d/part-time-job.glb");

export default PartTimeJobObject;
