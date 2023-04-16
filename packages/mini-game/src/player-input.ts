import { players } from "./utils/gamepad";
import type {
  CarGameState,
  DPadInputs,
  DigitalInputs,
  GamePadButtonInputs,
  ShoulderInputs,
  UserAction,
  KeyboardInputs,
} from "./player-state";

/**
  This method runs every frame per second to update the input state with
  latest gamepad input.
*/
export default function playerInput({
  state,
  dispatch,
}: {
  state: CarGameState;
  dispatch: React.Dispatch<UserAction>;
}) {
  const gamepad = players[0].module;
  const inputKeys: (keyof GamePadButtonInputs)[] = [
    "A",
    "B",
    "X",
    "Y",
    "L1",
    "L2",
    "R1",
    "R2",
    "dpadUp",
    "dpadDown",
    "dpadLeft",
    "dpadRight",
    "home",
    "select",
    "start",
  ];

  // const keyboardInputs: (keyof KeyboardInputs)[] = ["w", "a", "s", "d", "r"];

  const digitalInputs: (keyof DigitalInputs)[] = [
    "A",
    "B",
    "X",
    "Y",
    "start",
    "select",
    "home",
  ];

  const shoulderInputs: (keyof ShoulderInputs)[] = ["L1", "L2", "R1", "R2"];

  const dpadInputs: (keyof DPadInputs)[] = [
    "dpadUp",
    "dpadDown",
    "dpadLeft",
    "dpadRight",
  ];

  const analogSticks = ["L", "R"] as const;

  // Gamepad exists? Lets use the input
  if (gamepad && gamepad.getPadId()) {
    const buttons = gamepad.getButtons(
      "L1",
      "L2",
      "R1",
      "R2",
      "A",
      "X",
      "B",
      "Y",
      "dpadUp",
      "dpadDown",
      "dpadLeft",
      "dpadRight",
      "home",
      "select",
      "start"
    );

    // if (buttons.R2.pressed) {
    //   dispatch({
    //     type: "GAMEPAD_ACTION",
    //     payload: { button: "R2", pressed: true },
    //   });
    // } else if (buttons.L2.pressed) {
    //   dispatch({
    //     type: "GAMEPAD_ACTION",
    //     payload: { button: "L2", pressed: true },
    //   });
    // }

    // else {
    //   dispatch({
    //     type: "GAMEPAD_ACTION",
    //     payload: { button: "R2", pressed: false },
    //   });
    //   dispatch({
    //     type: "GAMEPAD_ACTION",
    //     payload: { button: "L2", pressed: false },
    //   });
    // }

    if (buttons.dpadLeft.pressed) {
      dispatch({
        type: "GAMEPAD_ACTION",
        payload: { button: "dpadLeft", pressed: true },
      });
    } else if (buttons.dpadRight.pressed) {
      dispatch({
        type: "GAMEPAD_ACTION",
        payload: { button: "dpadRight", pressed: true },
      });
    }

    if (buttons.Y.pressed) {
      dispatch({ type: "RESET_GAME" });
    }
    if (buttons.X.pressed) {
      dispatch({
        type: "PAUSE_GAME",
        payload: { gameRunning: !state.gameRunning },
      });
    }
    // shoulderInputs.forEach((inputKey) => {
    //   const pressed = gamepad.getButton(inputKey).pressed;

    //   if (pressed) {
    //     dispatch({
    //       type: "SHOULDER_ACTION",
    //       payload: { button: inputKey, pressed: pressed },
    //     });
    //   }
    // });

    // digitalInputs.forEach((inputKey) => {
    //   const pressed = gamepad.getButton(inputKey).pressed;

    //   if (pressed) {
    //     dispatch({
    //       type: "DIGITAL_ACTION",
    //       payload: { button: inputKey, pressed: pressed },
    //     });
    //   }
    // });

    // dpadInputs.forEach((inputKey) => {
    //   const pressed = gamepad.getButton(inputKey).pressed;
    //   if (pressed) {
    //     dispatch({
    //       type: "DPAD_ACTION",
    //       payload: { button: inputKey, pressed: pressed },
    //     });
    //   }
    // });

    inputKeys.forEach((inputKey) => {
      const pressed = gamepad.getButton(inputKey).pressed;
      const [x, y] = gamepad.getStick("L").value;

      if (pressed !== state[inputKey].pressed) {
        dispatch({
          type: "GAMEPAD_ACTION",
          payload: { button: inputKey, pressed: pressed },
        });
      }

      if (state["L"].x !== x) {
        dispatch({
          type: "ANALOG_ACTION",
          payload: {
            button: "L", //,analogStick,
            pressed,
            x,
            y: state["L"].y,
          },
        });
      }

      if (state["L"].y !== y) {
        dispatch({
          type: "ANALOG_ACTION",
          payload: {
            button: "L", //,analogStick,
            pressed,
            x: state["L"].x,
            y,
          },
        });
      }
    });

    // analogSticks.forEach((analogStick) => {
    //   const [x, y] = gamepad.getStick(analogStick).value;

    //   const pressed = gamepad.getStick(analogStick).pressed;

    //   if (state[analogStick].x !== x) {
    //     dispatch({
    //       type: "ANALOG_ACTION",
    //       payload: {
    //         button: "L", //,analogStick,
    //         pressed,
    //         x,
    //         y: state[analogStick].y,
    //       },
    //     });
    //   }
    //   if (state[analogStick].y !== y) {
    //     dispatch({
    //       type: "ANALOG_ACTION",
    //       payload: {
    //         button: "L", // analogStick,
    //         pressed,
    //         x: state[analogStick].x,
    //         y,
    //       },
    //     });
    //   }
    // });
  }
}
