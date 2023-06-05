"use client";
import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { Html, useFBX, useProgress } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import RealestateObject from "../../organisms/service/RealestateObject";
import PayObject from "../../organisms/service/PayObject";
import LifeObject from "../../organisms/service/LifeObject";
import StoreObject from "../../organisms/service/StoreObject";
import PartTimeJobObject from "../../organisms/service/PartTimeJobObject";
import CarObject from "../../organisms/service/CarObject";
import TradeObject from "../../organisms/service/TradeObject";
import { useSetRecoilState } from "recoil";
import { serviceIdState } from "@/src/utils/recoil/service";
import Loader from "../../atomics/Loader";

const ServiceCanvas = () => {
  useEffect(() => {
    // const threeCanvas = document.getElementById("three-canvas");
    // if (!threeCanvas) return;
    // 장면 추가
    // const scene = new THREE.Scene();
    // scene.background = new THREE.Color(0xeeeeee);
    // 카메라 추가
    // const camera = new THREE.PerspectiveCamera(
    //   75,
    //   threeCanvas.clientWidth / threeCanvas.clientHeight,
    //   0.1,
    //   1000
    // );
    // camera.position.z = 10;
    // camera.lookAt(0, 0, 0);
    // 렌더러 추가
    // const renderer = new THREE.WebGLRenderer({
    //   canvas: threeCanvas,
    //   antialias: true,
    //   alpha: true,
    // });
    // renderer.setSize(threeCanvas.clientWidth, threeCanvas.clientHeight);
    // document.body.appendChild(renderer.domElement);
    // // 카메라 이후에 등장필요
    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.enableDamping = true;
    // controls.update();
    // // 직사각형 빛 방출
    // const rectLight = new THREE.RectAreaLight(0xffffff, 2, 1, 1);
    // rectLight.position.set(0.5, 0.5, 1);
    // rectLight.lookAt(0, 0, 0);
    // scene.add(rectLight);
    // // 빛
    // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
    // directionalLight.position.set(1, 1, 1);
    // scene.add(directionalLight);
    // const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
    // directionalLight2.position.set(0.5, 2, 1);
    // scene.add(directionalLight2);
    // // 전역으로 빛 비춰줌
    // const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    // scene.add(ambientLight);
    // const fbxLoader = new FBXLoader();
    // const FBXObjects: THREE.Object3D<THREE.Event>[] = [];
    // // obj 파일 로드
    // let index = 0;
    // const onLoad = (fbx: THREE.Group) => {
    //   // FBXLoader는 로드된 모델이 그룹으로 넘어와서 자식을 꺼내줘야함
    //   const fbxObject = fbx.children[0];
    //   fbxObject.addEventListener("click", () => {
    //     gsap.to(fbxObject.rotation, 1, {
    //       y: Math.PI * 2,
    //     });
    //     gsap.to(fbxObject.scale, 1, {
    //       x: 2,
    //       y: 2,
    //       z: 2,
    //     });
    //     gsap.to(fbxObject.position, 1, {
    //       x: 0,
    //       y: 5,
    //       z: 0,
    //     });
    //   });
    //   fbxObject.addEventListener("unclick", () => {
    //     gsap.to(fbxObject.rotation!, 1, {
    //       y: 0,
    //     });
    //     gsap.to(fbxObject.scale!, 1, {
    //       x: 1,
    //       y: 1,
    //       z: 1,
    //     });
    //     gsap.to(fbxObject.position, 1, {
    //       x: -5 + index * 1.7,
    //       y: 0,
    //       z: 0,
    //     });
    //   });
    //   index += 1;
    //   fbxObject.scale.set(1, 1, 1);
    //   fbxObject.position.set(-5 + index * 1.7, 0, 0);
    //   FBXObjects.push(fbxObject);
    //   scene.add(fbxObject);
    // };
    // loadingManager쓰려니까 loadingManager.onLoad는 콜백함수에 fbx 오브젝트 객체를 파라미터로 안주더라
    // fbxLoader.load("/3d/heart.fbx", onLoad);
    // fbxLoader.load("/3d/mobile.fbx", onLoad);
    // fbxLoader.load("/3d/wallet.fbx", onLoad);
    // fbxLoader.load("/3d/star.fbx", onLoad);
    // fbxLoader.load("/3d/folder-fav.fbx", onLoad);
    // let clickedObject: THREE.Object3D<THREE.Event>;
    // const onClick = (e: MouseEvent) => {
    //   const mouse = {
    //     x: (e.clientX / renderer.domElement.clientWidth) * 2 - 1,
    //     y: -(e.clientY / renderer.domElement.clientHeight) * 2 + 1,
    //   };
    //   const raycaster = new THREE.Raycaster();
    //   raycaster.setFromCamera(mouse as any, camera);
    //   const intersects = raycaster.intersectObjects(FBXObjects, true);
    //   if (intersects.length <= 0) return;
    //   const target = FBXObjects.find(
    //     (fbxObject) => fbxObject.uuid === intersects[0].object.uuid
    //   );
    //   if (!target) return;
    //   if (clickedObject) clickedObject.dispatchEvent({ type: "unclick" });
    //   target?.dispatchEvent({ type: "click" });
    //   clickedObject = target;
    // };
    // renderer.domElement.addEventListener("click", onClick, false);
    // const animate = () => {
    //   console.log("hi");
    //   requestAnimationFrame(animate); //인자로 받은 함수 animate를 반복 실행
    //   renderer.render(scene, camera);
    // };
    // animate();
    // 반응형 처리
    // const onWindowResize = () => {
    //   camera.aspect = window.innerWidth / window.innerHeight;
    //   camera.updateProjectionMatrix();
    //   renderer.setSize(window.innerWidth, window.innerHeight);
    // };
    // window.addEventListener("resize", onWindowResize);
    // return () => {
    //   renderer.domElement.removeEventListener("mousemove", onClick, false);
    //   window.removeEventListener("resize", onWindowResize);
    //   scene.remove(scene);
    //   renderer.dispose(); // WebGLRenderer 해제
    //   scene.traverse((object) => {
    //     console.log(object);
    //     if (object instanceof THREE.Mesh) {
    //       object?.geometry?.dispose(); // 지오메트리 해제
    //       object?.material?.dispose(); // 재질 해제
    //     }
    //   });
    // };
  }, []);
  const { progress } = useProgress();

  const [clickedObject, setClickedObject] = useState<THREE.Group | undefined>(
    undefined
  );

  const [beforePositionOfTarget, setBeforePositionOfTarget] =
    useState<THREE.Vector3>();

  const setServiceId = useSetRecoilState(serviceIdState);
  const [targetFullfilled, setTargetFullfilled] = useState(false);

  const handleClick = (gltfObject: THREE.Group) => {
    if (clickedObject && beforePositionOfTarget) {
      // 어떤 오브젝트가 올라가고 있을 때 다른 오브젝트를 클릭할 수 없음
      if (!targetFullfilled) return;

      if (clickedObject.name === gltfObject.name) return;

      gsap.to(clickedObject.rotation, {
        y: 0,
        z: 0,
        x: 0,
        duration: 1,
      });

      gsap.to(clickedObject.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1,
      });

      gsap.to(clickedObject.position, {
        x: beforePositionOfTarget.x,
        y: beforePositionOfTarget.y,
        z: beforePositionOfTarget.z,
        duration: 1,
      });
    }
    setTargetFullfilled(false);
    // gltfObject는 객체이므로 참조타입이다.
    // 깊은 복사하여 값을 메모리 상에 따로 저장해놓지 않으면 이전 상태의 position이 아니라 새로운 position 값을 가지게 되므로 이전의 position인 제자리로 찾아가질 않음
    const gltfObjectPosition = { ...gltfObject?.position } as THREE.Vector3;
    setBeforePositionOfTarget(gltfObjectPosition);
    setClickedObject(gltfObject);
    setServiceId(gltfObject.name);
  };

  useEffect(() => {
    if (!clickedObject) return;
    gsap.to(clickedObject.rotation, {
      y: Math.PI * 2.1,
      x: 0,
      z: 0,
      duration: 1,
    });

    gsap.to(clickedObject.scale, {
      x: 1.5,
      y: 1.5,
      z: 1,
      duration: 1,
    });

    gsap
      .to(clickedObject.position, {
        x: 0,
        y: 4.5,
        z: 1,
        duration: 1,
      })
      .eventCallback("onComplete", () => setTargetFullfilled(true));
  }, [clickedObject]);

  useFrame(() => {
    if (!clickedObject || !targetFullfilled) return;
    const time = performance.now() / 1000; // 시간에 따라 변하는 값을 생성

    const yPos = Math.sin(time) * 0.25 + 4.5;
    clickedObject.position.y = yPos;
  });

  return (
    <>
      {/* 로딩바는 SSR에서는 소용없긴 할듯 */}
      {progress !== 100 && (
        <Html position={[0, -7.5, 0]}>
          <Loader />
        </Html>
      )}
      <rectAreaLight
        position={[0.5, 0.5, 1]}
        color={0xffffff}
        intensity={2}
        width={1}
        height={1}
      />
      <directionalLight position={[1, 1, 1]} color={0xffffff} intensity={0.2} />
      <directionalLight
        position={[0.5, 2, 1]}
        color={0xffffff}
        intensity={0.3}
      />
      <ambientLight color={0xffffff} intensity={1} />
      <TradeObject position={[-9, -7.5, -2]} handleClick={handleClick} />
      <LifeObject position={[-6, -7.5, -2]} handleClick={handleClick} />
      <StoreObject position={[-3, -7.5, -2]} handleClick={handleClick} />
      <PartTimeJobObject position={[0, -7.5, -2]} handleClick={handleClick} />
      <RealestateObject position={[6, -7.5, -2]} handleClick={handleClick} />
      <CarObject position={[3, -7.5, -2]} handleClick={handleClick} />
      <PayObject position={[9, -7.5, -2]} handleClick={handleClick} />
      {/* <FolderObject position={[0, -1, -2]} handleClick={handleClick} />
      <MobileObject position={[2, -1, -2]} handleClick={handleClick} />
      <StarObject position={[-2, -1, -2]} handleClick={handleClick} />
      <WalletObject position={[4, -1, -2]} handleClick={handleClick} /> */}
      {/*   <InteractiveObject
          url="/3d/heart.fbx"
          position={[-4, -1, -2]}
          handleClick={handleClick}
        />
        <InteractiveObject
          url="/3d/wallet.fbx"
          position={[-2, -1, -2]}
          handleClick={handleClick}
        />
        <InteractiveObject
          url="/3d/calendar.fbx"
          position={[0, -1, -2]}
          handleClick={handleClick}
        />
        <InteractiveObject
          url="/3d/folder.fbx"
          position={[2, -1, -2]}
          handleClick={handleClick}
        />
        <InteractiveObject
          url="/3d/mobile.fbx"
          position={[4, -1, -2]}
          handleClick={handleClick}
        /> */}

      {/* <canvas className="w-full h-full pt-14" id="three-canvas" /> */}
    </>
  );
};

export default ServiceCanvas;
