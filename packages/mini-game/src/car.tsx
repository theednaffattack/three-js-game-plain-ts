import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// @ts-ignore
import carUri from "./assets/models/car.glb";
import { XYZ } from "./local-types";
import { useControls } from "./use-controls";
import { useWheels } from "./use-wheels";
import { WheelDebug } from "./wheel-debug";

export function Car() {
  // @ts-ignore
  let mesh = useLoader(GLTFLoader, carUri).scene;

  const position: XYZ = [-1.5, 0.5, 3];
  const width = 0.15;
  const height = 0.07;
  const front = 0.15;
  const wheelRadius = 0.05;

  const chassisBodyArgs: XYZ = [width, height, front * 2];
  const [chassisBody, chassisApi] = useBox(
    () => ({ args: chassisBodyArgs, mass: 150, position }),
    useRef(null)
  );

  const [wheels, wheelInfos] = useWheels({
    width,
    height,
    front,
    radius: wheelRadius,
  });

  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({ chassisBody, wheelInfos, wheels }),
    useRef(null)
  );

  useControls(vehicleApi, chassisApi);

  useEffect(() => {
    mesh.scale.set(0.0012, 0.0012, 0.0012);
    mesh.children[0].position.set(-365, -18, -67);
  }, [mesh]);
  return (
    // <primitive object={mesh} rotation-y={Math.PI} />
    // @ts-ignore
    <group ref={vehicle} name="vehicle">
      {/* @ts-ignore */}
      <mesh ref={chassisBody}>
        <meshBasicMaterial transparent={true} opacity={0.3} />
        <boxGeometry args={chassisBodyArgs} />
      </mesh>

      <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
    </group>
  );
}
