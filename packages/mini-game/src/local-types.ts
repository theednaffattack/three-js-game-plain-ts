import type { Mesh } from "three";

export type XYZ = [x: number, y: number, z: number];

export interface GameState {
  // Core game state
  // Game started/ended
  gameRunning: boolean;
  startGame: () => void;
  endGame: () => void;

  // Game time
  timeStart?: Date;
  timeEnd?: Date;
  setTimeStart: (time: Date) => void;
  setTimeEnd: (time: Date) => void;

  // Players
  players: Player[];
  setPlayers: (players: Player[]) => void;
  addPlayer: (player: Player) => void;
  updatePlayer: (player: Player) => void;

  // Player state
  playerPosition: Mesh["position"] | Triplet;
  setPlayerPosition: (position: Mesh["position"] | Triplet) => void;

  // Input state
  keys: KeyState;
  setKeys: (keys: KeyState) => void;
  setKey: (key: KeyMap) => void;
}

// Adapted from: https://codesandbox.io/s/rob7b8?file=/src/store/types.ts
export interface Player {
  name: string;
  // Have they completed level?
  completed: boolean;
  // What time did they complete level?
  timeCompleted?: Date;
  // Color of marble
  color: string;
}

export type Triplet = [x: number, y: number, z: number];
export type Quad = [x: number, y: number, z: number, w: number];

// Input types (aka "keys")
export type KeyTypesNames = "boolean" | "number";
export type KeyTypes = boolean | number;
export interface KeyMap {
  // Name of key (e.g. Jump or Move)
  name: string;
  // Defaults to boolean
  type?: KeyTypes;
}

export type KeyState = Record<string, KeyTypes>;
export type KeyCallbacks = (e: KeyState) => void;
