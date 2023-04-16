import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
//@ts-ignore
import envmapUrl from "./assets/textures/envmap.hdr";
import { Car } from "./car";
import { Ground } from "./ground";
import { Track } from "./track";

export function Scene({
  gameStatus,
  setGameStatus,
}: {
  gameStatus: "isPaused" | "isPlaying";
  setGameStatus: React.Dispatch<React.SetStateAction<"isPaused" | "isPlaying">>;
}) {
  const camera = { fov: 40, position: { x: -6, y: 3.9, z: 6.21 } };
  const controls = { x: -2.64, y: -0.71, z: 0.03 };
  const config = { camera, controls };

  const [thirdPerson, setThirdPerson] = useState(true);
  const [cameraPosition, setCameraPosition] = useState<
    [number, number, number]
  >([-6, 3.9, 6.21]);

  useEffect(() => {
    function handleKeydown(evt: KeyboardEvent) {
      if (evt.key.toLowerCase() === "k") {
        // random is necessary to trigger a state change
        if (thirdPerson) {
          setCameraPosition([-6, 3.9, 6.21 + Math.random() * 0.01]);
        }

        setThirdPerson(!thirdPerson);
      }
    }

    addEventListener("keydown", handleKeydown);

    return () => removeEventListener("keydown", handleKeydown);
  }, [thirdPerson]);

  return (
    <Suspense fallback={null}>
      <Environment files={envmapUrl} background />
      <PerspectiveCamera
        makeDefault
        position={cameraPosition}
        fov={config.camera.fov}
      />
      {!thirdPerson ? (
        <OrbitControls
          target={[config.controls.x, config.controls.y, config.controls.z]}
        />
      ) : null}
      <Track />
      <Ground />
      <Car
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
        setThirdPerson={setThirdPerson}
        thirdPerson={thirdPerson}
        setCameraPosition={setCameraPosition}
      />
    </Suspense>
  );
}
