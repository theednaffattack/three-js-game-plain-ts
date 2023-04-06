import { Suspense } from "react";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
//@ts-ignore
import envmapUrl from "./assets/textures/envmap.hdr";

export function Scene() {
  const camera = { fov: 40, position: { x: -6, y: 3.9, z: 6.21 } };
  const controls = { x: -2.64, y: -0.71, z: 0.03 };
  const config = { camera, controls };
  return (
    <Suspense fallback={null}>
      <Environment files={envmapUrl} background />
      <PerspectiveCamera
        makeDefault
        position={[
          config.camera.position.x,
          config.camera.position.y,
          config.camera.position.z,
        ]}
        fov={config.camera.fov}
      />
      <OrbitControls
        target={[config.controls.x, config.controls.y, config.controls.z]}
      />
    </Suspense>
  );
}
