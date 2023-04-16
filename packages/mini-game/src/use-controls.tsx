import type { PublicApi, RaycastVehiclePublicApi } from "@react-three/cannon";
import { useCallback, useEffect, useReducer, useState } from "react";
import { joymap, players } from "./utils/gamepad";
import {
  CarGameState,
  carGameInitialState,
  carGameReducer,
} from "./player-state";
import playerInput from "./player-input";
import { numberWithinRange } from "./utils/number-within-range";
// import { createJoymap, createQueryModule, QueryModule } from "joymap";

// interface Player {
//   name: string;
//   module: QueryModule;
//   // color: string;
// }

// const joymap = createJoymap();

// const names = ["PlayerOne", "Juan", "John", "Jim"];

// // Create a list of players to render
// const players: Player[] = names.map((name) => {
//   const module = createQueryModule();
//   joymap.addModule(module);

//   return {
//     name,
//     module,
//     // color: colorHash.hex(name),
//   };
// }, names);

export function useControls({
  vehicleApi,
  chassisApi,
  gameStatus,
  setGameStatus,
  thirdPerson,
  setThirdPerson,
  setCameraPosition,
}: {
  vehicleApi: RaycastVehiclePublicApi;
  chassisApi: PublicApi;
  gameStatus: "isPaused" | "isPlaying";
  setGameStatus: React.Dispatch<React.SetStateAction<"isPaused" | "isPlaying">>;
  thirdPerson: boolean;
  setThirdPerson: React.Dispatch<React.SetStateAction<boolean>>;
  setCameraPosition: (
    value: React.SetStateAction<[number, number, number]>
  ) => void;
}) {
  // const gamepad = players[0].module;
  const config = {
    maxBrake: 75,
  };

  const [carGameState, carGameDispatch] = useReducer(
    carGameReducer,
    carGameInitialState
  );

  useEffect(() => {
    joymap.start();
    return () => {
      joymap.stop();
    };
  }, []);

  useEffect(() => {
    function handleKeydown(this: Window, ev: globalThis.KeyboardEvent) {
      const key = ev.code.toLocaleLowerCase().replace("key", "");
      const keysOfInterest = ["w", "a", "s", "d", "r", "space"];

      if (keysOfInterest.includes(key)) {
        carGameDispatch({
          type: "KEYBOARD_ACTION",
          // @ts-ignore
          payload: { button: key, pressed: true },
        });
      }
    }

    function handleKeyup(this: Window, ev: globalThis.KeyboardEvent) {
      const key = ev.code.toLocaleLowerCase().replace("key", "");
      const keysOfInterest = ["w", "a", "s", "d", "r", "space"];
      if (keysOfInterest.includes(key)) {
        carGameDispatch({
          type: "KEYBOARD_ACTION",
          // @ts-ignore
          payload: { button: key, pressed: false },
        });
      }
    }

    addEventListener("keydown", handleKeydown);
    addEventListener("keyup", handleKeyup);

    return () => {
      removeEventListener("keydown", handleKeydown);
      removeEventListener("keyup", handleKeyup);
    };
  }, []);

  const config2 = {
    /**The wheel index '2' according to raycastvehicle api */
    wheelFrontLeft: 2,
    /**The wheel index '3' according to raycastvehicle api */
    wheelFrontRight: 3,
    /**The wheel index '0' according to raycastvehicle api */
    wheelBackLeft: 0,
    /**The wheel index '1' according to raycastvehicle api */
    wheelBackRight: 1,
    /**Drive force applied forward */
    engineForceForward: 150,
    /**Drive force applied forward */
    engineForceBackward: -150,
    steerLeft: 0.35,
    steerRight: -0.35,
    breakforce: 45,
  };

  useEffect(() => {
    // Set defaults

    vehicleApi.setBrake(0, 3);
    vehicleApi.setBrake(0, 2);
    vehicleApi.setBrake(0, 1);
    vehicleApi.setBrake(0, 0);

    // BEGIN KEYBOARD CONTROLS
    // Moving forward
    if (carGameState.w.pressed || carGameState.R2.pressed) {
      vehicleApi.applyEngineForce(
        config2.engineForceForward,
        config2.wheelFrontLeft
      );
      vehicleApi.applyEngineForce(
        config2.engineForceForward,
        config2.wheelFrontRight
      );
    } else if (carGameState.s.pressed || carGameState.L2.pressed) {
      vehicleApi.applyEngineForce(
        config2.engineForceBackward,
        config2.wheelFrontLeft
      );
      vehicleApi.applyEngineForce(
        config2.engineForceBackward,
        config2.wheelFrontRight
      );
    } else {
      vehicleApi.applyEngineForce(0, config2.wheelFrontLeft);
      vehicleApi.applyEngineForce(0, config2.wheelFrontRight);
    }

    // Moving left
    if (carGameState.a.pressed || carGameState.L.x < 0) {
      vehicleApi.setSteeringValue(config2.steerLeft, config2.wheelFrontLeft);
      vehicleApi.setSteeringValue(config2.steerLeft, config2.wheelFrontRight);
      vehicleApi.setSteeringValue(-0.1, config2.wheelBackLeft);
      vehicleApi.setSteeringValue(-0.1, config2.wheelBackRight);
      // Moving right
    } else if (carGameState.d.pressed || carGameState.L.x > 0) {
      vehicleApi.setSteeringValue(config2.steerRight, config2.wheelFrontLeft);
      vehicleApi.setSteeringValue(config2.steerRight, config2.wheelFrontRight);
      vehicleApi.setSteeringValue(0.1, config2.wheelBackLeft);
      vehicleApi.setSteeringValue(0.1, config2.wheelBackRight);
    } else {
      for (let index = 0; index < 4; index++) {
        vehicleApi.setSteeringValue(0, index);
      }
    }

    if (carGameState.ArrowDown.pressed) {
      chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, +1]);
      chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, -1]);
      chassisApi.applyLocalImpulse([0, -5, 0], [-0.5, 0, 0]);
      chassisApi.applyLocalImpulse([0, -5, 0], [+0.5, 0, 0]);
    }

    if (carGameState.r.pressed) {
      vehicleApi.applyEngineForce(0, config2.wheelFrontLeft);
      vehicleApi.applyEngineForce(0, config2.wheelFrontRight);
      vehicleApi.applyEngineForce(0, config2.wheelBackLeft);
      vehicleApi.applyEngineForce(0, config2.wheelBackRight);
      chassisApi.position.set(-1.5, 0.5, 3);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      carGameDispatch({ type: "RESET_GAME" });
      // chassisApi.rotation.set(Math.PI / 2, 0, 0);
    }

    if (carGameState.space.pressed) {
      if (gameStatus === "isPaused") {
        setGameStatus(() => "isPlaying");
      }
      if (gameStatus === "isPlaying") {
        setGameStatus(() => "isPaused");
      }
    }

    // END KEYBOARD CONTROLS

    // BEGIN GAMEPAD CONTROLS
    // // Gas is pressed
    // if (carGameState.R2.pressed) {
    //   vehicleApi.applyEngineForce(
    //     config2.engineForceForward,
    //     config2.wheelFrontLeft
    //   );
    //   vehicleApi.applyEngineForce(
    //     config2.engineForceForward,
    //     config2.wheelFrontRight
    //   );
    // } else if (carGameState.L2.pressed) {
    //   vehicleApi.applyEngineForce(
    //     config2.engineForceBackward,
    //     config2.wheelFrontLeft
    //   );
    //   vehicleApi.applyEngineForce(
    //     config2.engineForceBackward,
    //     config2.wheelFrontRight
    //   );
    // } else {
    //   vehicleApi.applyEngineForce(0, config2.wheelFrontLeft);
    //   vehicleApi.applyEngineForce(0, config2.wheelFrontRight);
    // }

    // Brakes
    if (carGameState.L1.pressed) {
      vehicleApi.setBrake(config2.breakforce, 3);
      vehicleApi.setBrake(config2.breakforce, 2);
      vehicleApi.setBrake(config2.breakforce, 1);
      vehicleApi.setBrake(config2.breakforce, 0);
      // vehicleApi.setBrake(config.maxBrake, 3);
      // vehicleApi.setBrake(config.maxBrake, 2);
      // vehicleApi.setBrake(config.maxBrake, 1);
      // vehicleApi.setBrake(config.maxBrake, 0);
    }

    // Reset
    if (carGameState.Y.pressed) {
      chassisApi.position.set(-1.5, 0.5, 3);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      chassisApi.rotation.set(0, 0, 0);
    }

    // // Pause
    // if (carGameState.X.pressed) {
    //   if (gameStatus === "isPaused") {
    //     setGameStatus(() => "isPlaying");
    //   }
    //   if (gameStatus === "isPlaying") {
    //     setGameStatus(() => "isPaused");
    //   }
    // }

    // Third Person
    if (carGameState.home.pressed) {
      // random is necessary to trigger a state change
      if (thirdPerson) {
        setCameraPosition([-6, 3.9, 6.21 + Math.random() * 0.01]);
      }
      setThirdPerson(!thirdPerson);
    }
    // END GAMEPAD CONTROLS

    // if (carGameState.L.x) {
    //   // If pushing forward on the gamepad analog sticks
    //   if (carGameState.L.y < 0) {
    //     vehicleApi.applyEngineForce(150, 2);
    //     vehicleApi.applyEngineForce(150, 3);
    //   }
    //   // If pushing backward on the gamepad analog sticks
    //   if (carGameState.L.y > 0) {
    //     vehicleApi.applyEngineForce(-150, 2);
    //     vehicleApi.applyEngineForce(-150, 3);
    //   }

    //   // If pushing left on the gamepad analog sticks
    //   if (carGameState.L.x < 0) {
    //     vehicleApi.setSteeringValue(0.35, 2);
    //     vehicleApi.setSteeringValue(0.35, 3);
    //     vehicleApi.setSteeringValue(-0.1, 0);
    //     vehicleApi.setSteeringValue(-0.1, 1);
    //   }
    //   // If pushing right on the gamepad analog sticks
    //   if (carGameState.L.x > 0) {
    //     vehicleApi.setSteeringValue(-0.35, 2);
    //     vehicleApi.setSteeringValue(-0.35, 3);
    //     vehicleApi.setSteeringValue(0.1, 0);
    //     vehicleApi.setSteeringValue(0.1, 1);
    //   }
    // }
  }, [carGameState, vehicleApi, chassisApi]);

  return [carGameState, carGameDispatch] as const;
}
