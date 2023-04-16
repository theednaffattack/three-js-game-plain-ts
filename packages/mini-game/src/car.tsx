import { Triplet, useBox, useRaycastVehicle } from "@react-three/cannon";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// @ts-ignore
import carUri from "./assets/models/car.glb";
import { XYZ } from "./local-types";
import { useControls } from "./use-controls";
import { useWheels } from "./use-wheels";
import { WheelDebug } from "./wheel-debug";
import { Quaternion, Vector3 } from "three";
import { joymap, players } from "./utils/gamepad";
import playerInput from "./player-input";

export function Car({
  gameStatus,
  setGameStatus,
  thirdPerson,
  setThirdPerson,
  setCameraPosition,
}: {
  thirdPerson: boolean;
  setThirdPerson: React.Dispatch<React.SetStateAction<boolean>>;
  gameStatus: "isPaused" | "isPlaying";
  setGameStatus: React.Dispatch<React.SetStateAction<"isPaused" | "isPlaying">>;
  setCameraPosition: (
    value: React.SetStateAction<[number, number, number]>
  ) => void;
}) {
  // @ts-ignore
  let mesh = useLoader(GLTFLoader, carUri).scene;

  interface IDescriptiveCarConfig {
    position: Triplet;
    width: number;
    height: number;
    front: number;
    wheelRadius: number;
    mass: number;
  }

  const descriptiveCarConfig: IDescriptiveCarConfig = {
    position: [-1.5, 0.5, 3],
    width: 0.15,
    height: 0.07,
    front: 0.15,
    wheelRadius: 0.05,
    mass: 500, // 150,
  };

  const config: IDescriptiveCarConfig & { chassisBodyArgs: Triplet } = {
    ...descriptiveCarConfig,
    chassisBodyArgs: [
      descriptiveCarConfig.width,
      descriptiveCarConfig.height,
      descriptiveCarConfig.front * 2,
    ],
  };

  // const position: XYZ = [-1.5, 0.5, 3];
  // const width = 0.15;
  // const height = 0.07;
  // const front = 0.15;
  // const wheelRadius = 0.05;

  // const chassisBodyArgs: XYZ = [width, height, front * 2];

  const [chassisBody, chassisApi] = useBox(
    () => ({
      args: config.chassisBodyArgs,
      mass: config.mass,
      position: config.position,
    }),
    useRef(null)
  );

  const [wheels, wheelInfos] = useWheels({
    width: config.width,
    height: config.height,
    front: config.front,
    radius: config.wheelRadius,
  });

  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({ chassisBody, wheelInfos, wheels }),
    useRef(null)
  );

  const [carGameState, carGameDispatch] = useControls({
    vehicleApi,
    chassisApi,
    gameStatus,
    setGameStatus,
    thirdPerson,
    setThirdPerson,
    setCameraPosition,
  });

  useFrame((state) => {
    playerInput({ state: carGameState, dispatch: carGameDispatch });
    if (!thirdPerson) {
      return;
    }

    let position = new Vector3(0, 0, 0);

    let quaternion = new Quaternion(0, 0, 0, 0);
    if (chassisBody.current) {
      position.setFromMatrixPosition(chassisBody.current?.matrixWorld);
      quaternion.setFromRotationMatrix(chassisBody.current.matrixWorld);
    }

    let wDir = new Vector3(0, 0, -1);
    wDir.applyQuaternion(quaternion);
    wDir.normalize();

    let cameraPosition = position
      .clone()
      .add(wDir.clone().multiplyScalar(-1).add(new Vector3(0, 0.3, 0)));

    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(position);
  });

  useEffect(() => {
    // const [, updateState] = useState<{ [key: string]: any } | null>(null);
    // const forceUpdate = useCallback(() => updateState({}), []);
    // joymap.setOnPoll(forceUpdate);
    // joymap.start();

    return () => {
      joymap.stop();
    };
  }, []);

  useEffect(() => {
    mesh.scale.set(0.0012, 0.0012, 0.0012);
    mesh.children[0].position.set(-365, -18, -67);
  }, [mesh]);
  return (
    <>
      {/* @ts-ignore */}
      <group ref={vehicle} name="vehicle">
        {/* @ts-ignore */}
        <group ref={chassisBody} name="chassisBody">
          <primitive
            object={mesh}
            rotation-y={Math.PI}
            position={[0, -0.09, 0]}
          />
        </group>
        {/* @ts-ignore */}
        {/* <mesh ref={chassisBody}>
        <meshBasicMaterial transparent={true} opacity={0.3} />
        <boxGeometry args={chassisBodyArgs} />
      </mesh> */}

        <WheelDebug wheelRef={wheels[0]} radius={config.wheelRadius} />
        <WheelDebug wheelRef={wheels[1]} radius={config.wheelRadius} />
        <WheelDebug wheelRef={wheels[2]} radius={config.wheelRadius} />
        <WheelDebug wheelRef={wheels[3]} radius={config.wheelRadius} />
      </group>
    </>
  );
}
