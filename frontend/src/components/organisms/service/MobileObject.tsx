import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Cube009: THREE.Mesh;
    Cube009_1: THREE.Mesh;
    Cube009_2: THREE.Mesh;
  };
  materials: {
    ["Color - Red Grad"]: THREE.MeshStandardMaterial;
    ["Clay White"]: THREE.MeshStandardMaterial;
    ["Color - Black"]: THREE.MeshStandardMaterial;
  };
};

interface IMobileObject {
  position: [number, number, number];
  handleClick: (gltfObject: THREE.Group) => void;
}
export default function MobileObject({ handleClick, position }: IMobileObject) {
  const { nodes, materials } = useGLTF("/3d/mobile.glb") as GLTFResult;

  const gltfRef = useRef<THREE.Group>();

  let gltf: THREE.Group = gltfRef.current!;
  useEffect(() => {
    gltf = gltfRef.current!;
  }, []);

  useFrame((_, delta) => {
    gltf.rotation.y += 0.5 * delta;
  });
  return (
    <group
      // @ts-ignore
      ref={gltfRef}
      position={position}
      dispose={null}
      onClick={() => handleClick(gltf)}
      scale={[1, 1, 1]}
    >
      <mesh
        geometry={nodes.Cube009.geometry}
        material={materials["Color - Red Grad"]}
      />
      <mesh
        geometry={nodes.Cube009_1.geometry}
        material={materials["Clay White"]}
      />
      <mesh
        geometry={nodes.Cube009_2.geometry}
        material={materials["Color - Black"]}
      />
    </group>
  );
}

useGLTF.preload("/3d/mobile.glb");
