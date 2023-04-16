import { useFrame } from "@react-three/fiber";
import React, { useCallback, useEffect, useState } from "react";
import playerInput from "./player-input";
// import { useStore } from "../store/store";
import { joymap, players } from "./utils/gamepad";
import { CarGameState, UserAction } from "./player-state";

interface Props {
  state: CarGameState;
  dispatch: React.Dispatch<UserAction>;
}

// Component that checks for gamepad input and updates Zustand store
const GamepadInput = (props: Props) => {
  useFrame(() => {
    playerInput(props);
  });

  // Debug
  // if (players[0].module.getPadId()) console.log("is pressed?", pressed)

  return <></>;
};

export default GamepadInput;
