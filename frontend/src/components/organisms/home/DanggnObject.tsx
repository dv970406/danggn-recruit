"use client";

import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import React from "react";
import { TextureLoader } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  nodes: {
    carrot_ncl1_1: THREE.Mesh;
    leaf_ncl1_1: THREE.Mesh;
  };
  materials: {
    carrot_ncl1_1: THREE.MeshStandardMaterial;
    leaf_ncl1_1: THREE.MeshStandardMaterial;
  };
};
const DanggnObject = () => {
  const { nodes, materials } = useGLTF("/3d/danggn.glb") as GLTFResult;

  const bodyColor = useLoader(TextureLoader, "/3d/carrot-body.jpeg");
  const headColor = useLoader(TextureLoader, "/3d/carrot-head.jpeg");
  return (
    <group
      position={[0, -5, 0]}
      scale={[0.3, 0.3, 0.3]}
      rotation={[0, 0, 0]}
      dispose={null}
    >
      <mesh
        geometry={nodes.carrot_ncl1_1.geometry}
        material={materials.carrot_ncl1_1}
        position={[-0.159, 13.477, -0.25]}
        rotation={[-1.182, 0.576, 0.937]}
      >
        <meshStandardMaterial map={bodyColor} />
      </mesh>
      <mesh
        geometry={nodes.leaf_ncl1_1.geometry}
        material={materials.leaf_ncl1_1}
        position={[-0.159, 13.477, -0.25]}
        rotation={[-1.182, 0.576, 0.937]}
      >
        <meshStandardMaterial map={headColor} />
      </mesh>
    </group>
  );
};

export default DanggnObject;
