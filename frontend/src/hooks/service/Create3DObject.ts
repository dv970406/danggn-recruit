import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

// GLB파일로부터 GLTF 3D 오브젝트 데이터를 웹에 가져오는 로직
export const useCreate3DObject = <T>(
  serviceId: string,
  gltfRef: React.MutableRefObject<THREE.Group | undefined>
) => {
  const gltfData: any = useGLTF(`/3d/${serviceId}.glb`) as T;

  const [gltf, setGltf] = useState(gltfRef.current!);
  useEffect(() => {
    const data: any = {
      ...gltfRef.current!,
      name: serviceId,
    };
    setGltf(data);
  }, [gltfRef]);

  useFrame((_, delta) => {
    if (!gltf) return;
    gltf.rotation.y += 0.5 * delta;
  });

  return {
    gltf,
    nodes: gltfData.nodes,
    materials: gltfData.materials,
  };
};
