import { Mesh } from "three";
import { KeyMap, KeyState, Player, Triplet } from "./local-types";

interface PressState {
  pressed: boolean;
}

export interface ShoulderInputs {
  L1: PressState;
  L2: PressState;
  R1: PressState;
  R2: PressState;
}

interface AnalogInputs {
  L: PressState & { x: number; y: number };
  R: PressState & { x: number; y: number };
}

export interface DigitalInputs {
  A: PressState;
  B: PressState;
  X: PressState;
  Y: PressState;
  start: PressState;
  select: PressState;
  home: PressState;
}

export interface DPadInputs {
  dpadUp: PressState;
  dpadDown: PressState;
  dpadLeft: PressState;
  dpadRight: PressState;
}

export interface KeyboardInputs {
  w: PressState;
  a: PressState;
  s: PressState;
  d: PressState;
  r: PressState;
  space: PressState;
  ArrowUp: PressState;
  ArrowDown: PressState;
  ArrowLeft: PressState;
  ArrowRight: PressState;
}

export interface GamePadInputs
  extends ShoulderInputs,
    DPadInputs,
    DigitalInputs,
    AnalogInputs {}

export interface GamePadButtonInputs
  extends ShoulderInputs,
    DigitalInputs,
    DPadInputs {}

export interface CarGameState extends GamePadInputs, KeyboardInputs {
  // Core game state
  // Game started/ended
  gameRunning: boolean;
  //   startGame: () => void;
  //   endGame: () => void;

  // Players
  players: Player[];
  //   setPlayers: (players: Player[]) => void;
  //   addPlayer: (player: Player) => void;
  //   updatePlayer: (player: Player) => void;

  // Player state
  playerPosition: Mesh["position"] | Triplet;
  //   setPlayerPosition: (position: Mesh["position"] | Triplet) => void;

  // Input state
  //   keys: KeyState;
  //   setKeys: (keys: KeyState) => void;
  //   setKey: (key: KeyMap) => void;
}

interface IReducer<S, A> {
  (state: S, action: A): S;
}

export interface IReduxAction<T> {
  type: T;
}
export type IActionReducerMapping<S, A extends IReduxAction<string>> = {
  [K in A["type"]]: IReducer<S, Extract<A, { type: K }>>;
};

// type InputKeyType = keyof GamePadState;

// type ActionPayload<T extends keyof GamePadState> = {
//   [K in InputKeyType]: GamePadState[T];
// };

// type ActionType<T extends keyof GamePadState> =
//   | { type: InputKeyType; payload: ActionPayload<T> }
//   | { type: "reset" };

interface IAnalogAction {
  type: "ANALOG_ACTION";
  payload: {
    button: keyof AnalogInputs;
    pressed: boolean;
    x: number;
    y: number;
  };
}

interface IShoulderAction {
  type: "SHOULDER_ACTION";
  payload: { pressed: boolean; button: keyof ShoulderInputs };
}

interface IDigitalAction {
  type: "DIGITAL_ACTION";
  payload: { pressed: boolean; button: keyof DigitalInputs };
}

interface IDPadAction {
  type: "DPAD_ACTION";
  payload: { pressed: boolean; button: keyof DPadInputs };
}

interface IStartGameAction {
  type: "START_GAME";
  payload: { gameStarted: boolean };
}

interface IEndGameAction {
  type: "END_GAME";
  payload: { gameStarted: boolean };
}

interface IRestartGameAction {
  type: "RESET_GAME";
}
interface IPauseGameAction {
  type: "PAUSE_GAME";
  payload: { gameRunning: boolean };
}

interface IKeyboardAction {
  type: "KEYBOARD_ACTION";
  payload: { pressed: boolean; button: keyof KeyboardInputs };
}

interface IGamepadAction {
  type: "GAMEPAD_ACTION";
  payload: { pressed: boolean; button: keyof GamePadButtonInputs };
}

export type UserAction =
  | IAnalogAction
  | IShoulderAction
  | IDigitalAction
  | IStartGameAction
  | IEndGameAction
  | IKeyboardAction
  | IDPadAction
  | IGamepadAction
  | IRestartGameAction
  | IPauseGameAction;

export const gamepad_action: IActionReducerMapping<CarGameState, UserAction> = {
  ANALOG_ACTION: (state, action) => {
    return {
      ...state,
      [action.payload.button]: {
        pressed: action.payload.pressed,
        x: action.payload.x,
        y: action.payload.y,
      },
    };
  },
  DIGITAL_ACTION: (state, action) => ({
    ...state,
    [action.payload.button]: { pressed: action.payload.pressed },
  }),
  SHOULDER_ACTION: (state, action) => ({
    ...state,
    [action.payload.button]: { pressed: action.payload.pressed },
  }),
  END_GAME: (state, action) => {
    return { ...state, gameRunning: false };
  },
  START_GAME: (state, action) => {
    return { ...state, gameRunning: true };
  },
  RESET_GAME: (state) => {
    return { ...carGameInitialState };
  },
  PAUSE_GAME: (state) => {
    return { ...state, gameRunning: !state.gameRunning };
  },
  KEYBOARD_ACTION: (state, action) => {
    return {
      ...state,
      [action.payload.button]: { pressed: action.payload.pressed },
    };
  },
  DPAD_ACTION: (state, action) => {
    const newState = {
      ...state,
      [action.payload.button]: { pressed: action.payload.pressed },
    };

    return newState;
  },
  GAMEPAD_ACTION: (state, action) => {
    return {
      ...state,
      [action.payload.button]: { pressed: action.payload.pressed },
    };
  },
};

// const analogInputs: InputNames[] = ["L", "R"];
// // const shoulderInputs: InputNames[] = ["L2", "L1", "R2", "R1"];
// const digitalInputs: InputNames[] = [
//   "dpadUp",
//   "dpadDown",
//   "dpadLeft",
//   "dpadRight",
//   "A",
//   "B",
//   "X",
//   "Y",
//   "start",
//   "select",
//   "home",
// ];

export const carGameInitialState: CarGameState = {
  A: { pressed: false },
  X: { pressed: false },
  Y: { pressed: false },
  B: { pressed: false },
  L: { pressed: false, x: 0, y: 0 },
  R: { pressed: false, x: 0, y: 0 },
  R1: { pressed: false },
  R2: { pressed: false },
  L1: { pressed: false },
  L2: { pressed: false },
  dpadUp: { pressed: false },
  dpadDown: { pressed: false },
  dpadLeft: { pressed: false },
  dpadRight: { pressed: false },
  home: { pressed: false },
  select: { pressed: false },
  start: { pressed: false },
  w: { pressed: false },
  a: { pressed: false },
  s: { pressed: false },
  d: { pressed: false },
  r: { pressed: false },
  space: { pressed: false },
  ArrowUp: { pressed: false },
  ArrowDown: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowRight: { pressed: false },
  gameRunning: false,
  playerPosition: [0, 0, 0],
  players: [],
};

// Our reducer function that uses a switch statement to handle our actions
export function carGameReducer(state: CarGameState, action: UserAction) {
  switch (action.type) {
    case "ANALOG_ACTION":
      return gamepad_action.ANALOG_ACTION(state, action);
    case "DIGITAL_ACTION":
      return gamepad_action.DIGITAL_ACTION(state, action);
    case "SHOULDER_ACTION":
      return gamepad_action.SHOULDER_ACTION(state, action);
    case "KEYBOARD_ACTION":
      return gamepad_action.KEYBOARD_ACTION(state, action);
    case "DPAD_ACTION":
      return gamepad_action.DPAD_ACTION(state, action);
    case "START_GAME":
      return gamepad_action.START_GAME(state, action);
    case "END_GAME":
      return gamepad_action.END_GAME(state, action);
    case "GAMEPAD_ACTION":
      return gamepad_action.GAMEPAD_ACTION(state, action);
    case "RESET_GAME":
      return gamepad_action.RESET_GAME(state, action);
    case "PAUSE_GAME":
      return gamepad_action.PAUSE_GAME(state, action);
    default:
      return state;
  }
}
