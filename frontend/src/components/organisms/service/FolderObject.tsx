import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Plane009: THREE.Mesh;
    Plane009_1: THREE.Mesh;
  };
  materials: {
    ["Color - Yellow"]: THREE.MeshStandardMaterial;
    ["Clay White.001"]: THREE.MeshStandardMaterial;
  };
};

type ActionName = "Folder|Folder|Folder PlusAction";
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

interface IFolderObject {
  position: [number, number, number];
  handleClick: (gltfObject: THREE.Group) => void;
}
export default function FolderObject({ position, handleClick }: IFolderObject) {
  const { nodes, materials, animations } = useGLTF(
    "/3d/folder.glb"
  ) as GLTFResult;

  const gltfRef = useRef();

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
      dispose={null}
      onClick={() => handleClick(gltf)}
      position={position}
      scale={[1, 1, 1]}
    >
      <group name="Scene">
        <group name="Cube" />
        <group name="Folder">
          <mesh
            name="Plane009"
            geometry={nodes.Plane009.geometry}
            material={materials["Color - Yellow"]}
          />
          <mesh
            name="Plane009_1"
            geometry={nodes.Plane009_1.geometry}
            material={materials["Clay White.001"]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/3d/folder.glb");
