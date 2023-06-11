import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { useCreate3DObject } from "@/src/hooks/service/Create3DObject";
import { COLORS } from "@/src/utils/values/color";

type GLTFResult = GLTF & {
  nodes: {
    Plane003: THREE.Mesh;
    Plane003_1: THREE.Mesh;
  };
  materials: {
    ["Color - Red Pin"]: THREE.MeshStandardMaterial;
    ["Color - Red Ripple"]: THREE.MeshStandardMaterial;
  };
};

interface IStoreObject {
  position: [number, number, number];
  handleClick: (gltfObject: THREE.Group) => void;
}

// 동네가게용 3D 오브젝트
const StoreObject = ({ handleClick, position }: IStoreObject) => {
  const gltfRef = useRef<THREE.Group>();

  const { gltf, materials, nodes } = useCreate3DObject<GLTFResult>(
    "store",
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
        geometry={nodes.Plane003.geometry}
        material={
          new THREE.MeshStandardMaterial({
            color: COLORS["danggn-orange"],
          })
        }
      />
      <mesh
        geometry={nodes.Plane003_1.geometry}
        material={
          new THREE.MeshStandardMaterial({
            color: COLORS["danggn-lightgray"],
          })
        }
      />
    </group>
  );
};

useGLTF.preload("/3d/store.glb");

export default StoreObject;
