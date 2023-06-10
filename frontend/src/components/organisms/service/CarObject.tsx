import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { useCreate3DObject } from "@/src/hooks/service/Create3DObject";
import { COLORS } from "@/src/utils/values/color";

type GLTFResult = GLTF & {
  nodes: {
    Cylinder018: THREE.Mesh;
    Cylinder018_1: THREE.Mesh;
    Cylinder018_2: THREE.Mesh;
    Cylinder018_3: THREE.Mesh;
    Cylinder018_4: THREE.Mesh;
  };
  materials: {
    ["Color - Red Body"]: THREE.MeshStandardMaterial;
    ["Color - Blue Window"]: THREE.MeshStandardMaterial;
    ["Silver Metal.005"]: THREE.MeshStandardMaterial;
    ["Color - Light Blue"]: THREE.MeshStandardMaterial;
    ["Color - Yellow Fire"]: THREE.MeshStandardMaterial;
  };
};

interface ICarObject {
  position: [number, number, number];
  handleClick: (gltfObject: THREE.Group) => void;
}
const CarObject = ({ position, handleClick }: ICarObject) => {
  const gltfRef = useRef<THREE.Group>();

  const { gltf, materials, nodes } = useCreate3DObject<GLTFResult>(
    "car",
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
        geometry={nodes.Cylinder018.geometry}
        material={
          new THREE.MeshStandardMaterial({
            color: COLORS["danggn-orange"],
          })
        }
      />
      <mesh
        geometry={nodes.Cylinder018_1.geometry}
        material={
          new THREE.MeshStandardMaterial({
            color: COLORS["danggn-lightgray"],
          })
        }
      />
      <mesh
        geometry={nodes.Cylinder018_2.geometry}
        material={
          new THREE.MeshStandardMaterial({
            color: COLORS["danggn-darkgray"],
          })
        }
      />
      <mesh
        geometry={nodes.Cylinder018_3.geometry}
        material={
          new THREE.MeshStandardMaterial({
            color: COLORS["danggn-darkgray"],
          })
        }
      />
      <mesh
        geometry={nodes.Cylinder018_4.geometry}
        material={
          new THREE.MeshStandardMaterial({
            color: COLORS["danggn-orange"],
          })
        }
      />
    </group>
  );
};

useGLTF.preload("/3d/car.glb");

export default CarObject;
