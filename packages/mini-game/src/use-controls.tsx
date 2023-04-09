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
    if (controls.w) {
      vehicleApi.applyEngineForce(150, 2);
      vehicleApi.applyEngineForce(150, 3);
    } else if (controls.s || controls.arrowdown) {
      vehicleApi.applyEngineForce(-150, 2);
      vehicleApi.applyEngineForce(-150, 3);
    } else {
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
    }

    if (controls.a) {
      vehicleApi.setSteeringValue(0.35, 2);
      vehicleApi.setSteeringValue(0.35, 3);
      vehicleApi.setSteeringValue(-0.1, 0);
      vehicleApi.setSteeringValue(-0.1, 1);
    } else if (controls.d) {
      vehicleApi.setSteeringValue(-0.35, 2);
      vehicleApi.setSteeringValue(-0.35, 3);
      vehicleApi.setSteeringValue(0.1, 0);
      vehicleApi.setSteeringValue(0.1, 1);
    } else {
      for (let index = 0; index < 4; index++) {
        vehicleApi.setSteeringValue(0, index);
      }
    }

    if (controls.arrowdown) {
      chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, +1]);
      chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, -1]);
      chassisApi.applyLocalImpulse([0, -5, 0], [-0.5, 0, 0]);
      chassisApi.applyLocalImpulse([0, -5, 0], [+0.5, 0, 0]);
    }

    if (controls.r) {
      chassisApi.position.set(-1.5, 0.5, 3);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      chassisApi.rotation.set(0, 0, 0);
    }
  }, [controls, vehicleApi, chassisApi]);

  return controls;
}
