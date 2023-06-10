import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useCreate3DObject } from "@/src/hooks/service/Create3DObject";
import { COLORS } from "@/src/utils/values/color";

type GLTFResult = GLTF & {
  nodes: {
    Cube001: THREE.Mesh;
    Cube001_1: THREE.Mesh;
    Cube001_2: THREE.Mesh;
  };
  materials: {
    ["Color - Red Card.001"]: THREE.MeshStandardMaterial;
    ["Color - Yellow Text.001"]: THREE.MeshStandardMaterial;
    ["Color - Red Circle.001"]: THREE.MeshStandardMaterial;
  };
};

interface IPayObject {
  position: [number, number, number];
  handleClick: (gltfObject: THREE.Group) => void;
}
const PayObject = ({ position, handleClick }: IPayObject) => {
  const gltfRef = useRef<THREE.Group>();

  const { gltf, materials, nodes } = useCreate3DObject<GLTFResult>(
    "pay",
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
        geometry={nodes.Cube001.geometry}
        material={
          new THREE.MeshStandardMaterial({
            color: COLORS["danggn-orange"],
          })
        }
      />
      <mesh
        geometry={nodes.Cube001_1.geometry}
        material={
          new THREE.MeshStandardMaterial({
            color: COLORS["danggn-lightgray"],
          })
        }
      />
      <mesh
        geometry={nodes.Cube001_2.geometry}
        material={
          new THREE.MeshStandardMaterial({
            color: COLORS["danggn-lightgray"],
          })
        }
      />
    </group>
  );
};

useGLTF.preload("/3d/pay.glb");

export default PayObject;
