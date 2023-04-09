import {
  CompoundBodyProps,
  RaycastVehicleProps,
  WheelInfoOptions,
  useCompoundBody,
} from "@react-three/cannon";
import { useRef } from "react";

interface UseWheelsArgs {
  width: number;
  height: number;
  front: number;
  radius: number;
}

export function useWheels({
  width,
  height,
  front,
  radius,
}: UseWheelsArgs): [React.MutableRefObject<null>[], WheelInfoOptions[]] {
  const wheels = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const wheelInfo: WheelInfoOptions = {
    axleLocal: [1, 0, 0],
    directionLocal: [0, -1, 0],
    radius,
    suspensionStiffness: 60,
    suspensionRestLength: 0.1,
    frictionSlip: 5,
    dampingRelaxation: 2.3,
    dampingCompression: 4.4,
    maxSuspensionForce: 100_000,
    rollInfluence: 0.01,
    maxSuspensionTravel: 0.1,
    customSlidingRotationalSpeed: -30,
    useCustomSlidingRotationalSpeed: true,
  };

  const wheelInfos: WheelInfoOptions[] = [
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [-width * 0.65, height * 0.4, front],
      isFrontWheel: true,
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [width * 0.65, height * 0.4, front],
      isFrontWheel: true,
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [-width * 0.65, height * 0.4, -front],
      isFrontWheel: true,
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [width * 0.65, height * 0.4, -front],
      isFrontWheel: true,
    },
  ];

  function propsFunc() {
    return {
      collisionFilterGroup: 0,
      mass: 1,
      shapes: [
        {
          args: [wheelInfo.radius, wheelInfo.radius, 0.015, 16],
          rotation: [0, 0, -Math.PI / 2],
          type: "Cylinder",
        },
      ],
      type: "Kinematic",
    };
  }

  // @ts-ignore
  useCompoundBody(propsFunc, wheels[0]);
  // @ts-ignore
  useCompoundBody(propsFunc, wheels[1]);
  // @ts-ignore
  useCompoundBody(propsFunc, wheels[2]);
  // @ts-ignore
  useCompoundBody(propsFunc, wheels[3]);

  return [wheels, wheelInfos];
}
