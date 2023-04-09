import type { PublicApi, RaycastVehiclePublicApi } from "@react-three/cannon";
import { useEffect, useState } from "react";

export function useControls(
  vehicleApi: RaycastVehiclePublicApi,
  chassisApi: PublicApi
) {
  let [controls, setControls] = useState({
    w: false,
    a: false,
    s: false,
    d: false,
    arrowup: false,
    arrowdown: false,
    arrowleft: false,
    arrowright: false,

    r: false,
  });

  useEffect(() => {
    function handleKeydown(this: Window, ev: globalThis.KeyboardEvent) {
      setControls((controls) => ({
        ...controls,
        [ev.key.toLowerCase()]: true,
      }));
    }

    function handleKeyup(this: Window, ev: globalThis.KeyboardEvent) {
      setControls((controls) => ({
        ...controls,
        [ev.key.toLowerCase()]: false,
      }));
    }

    addEventListener("keydown", handleKeydown);
    addEventListener("keyup", handleKeyup);

    return () => {
      removeEventListener("keydown", handleKeydown);
      removeEventListener("keyup", handleKeyup);
    };
  }, []);

  useEffect(() => {
    if (controls.w || controls.arrowup) {
      vehicleApi.applyEngineForce(150, 2);
      vehicleApi.applyEngineForce(150, 3);
    } else if (controls.s || controls.arrowdown) {
      vehicleApi.applyEngineForce(-150, 2);
      vehicleApi.applyEngineForce(-150, 3);
    } else {
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
    }

    if (controls.a || controls.arrowleft) {
      vehicleApi.setSteeringValue(0.35, 2);
      vehicleApi.setSteeringValue(0.35, 3);
      vehicleApi.setSteeringValue(-0.1, 0);
      vehicleApi.setSteeringValue(-0.1, 1);
    } else if (controls.d || controls.arrowright) {
      vehicleApi.setSteeringValue(-0.35, 2);
      vehicleApi.setSteeringValue(-0.35, 3);
      vehicleApi.setSteeringValue(0.1, 0);
      vehicleApi.setSteeringValue(0.1, 1);
    } else {
      for (let index = 0; index < 4; index++) {
        vehicleApi.setSteeringValue(0, index);
      }
    }
  }, [controls, vehicleApi, chassisApi]);

  return controls;
}
