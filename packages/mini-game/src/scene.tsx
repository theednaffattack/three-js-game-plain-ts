import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense } from "react";
//@ts-ignore
import envmapUrl from "./assets/textures/envmap.hdr";
import { Car } from "./car";
import { Ground } from "./ground";
import { Track } from "./track";

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
      <Track />
      <Ground />
      <Car />
    </Suspense>
  );
}
