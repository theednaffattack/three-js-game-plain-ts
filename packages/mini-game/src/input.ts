import { useStore } from "../store/store";
import { KeyState, KeyTypes } from "../store/types";

/**
 * System for unifying input across different devices (gamepad, keyboard, etc)
 * using "input actions" similar to Unity's Input System
 *
 * You essentially pass a hashmap of keys (like Jump) and default value (like false)
 * and let other input device APIs update this class using that data model.
 *
 * This resolves issue of inputs not matching (e.g. W key and DPadUp for forward movement)
 *
 * @see: https://docs.unity3d.com/Packages/com.unity.inputsystem@1.0/manual/Actions.html
 */
class Input {
  /**
   * Initialize or override current key mapping
   * @param keys Big object with input names and default values
   */
  setKeys(keys: KeyState) {
    // @todo: Maybe optimize this by storing these setter functions in class?
    // I don't think they change like state does (since they're functions)
    const { setKeys } = useStore.getState();
    setKeys(keys);
  }

  /**
   * Sets key to value provided
   * usually used by input devices like gamepad to update input state
   * @param keyName
   * @param value
   */
  setKey(keyName: string, value: KeyTypes) {
    const { setKey } = useStore.getState();
    setKey({
      name: keyName,
      type: value,
    });
  }

  /**
   * Provides the current state of an input action (e.g. Jump = false)
   * @param keyName The "key" (or name) of action you want state for
   */
  getKey(keyName) {
    const { keys } = useStore.getState();
    return keys[keyName];
  }
}

// We initialize a "singleton" of the input class
// Basically ensure we only ever have 1 (since that's all we need)
const input = new Input();

export const INPUT_MAP = {
  Jump: false,
  Reset: false,
  MoveUp: false,
  MoveDown: false,
  MoveLeft: false,
  MoveRight: false,
};

// We set the keys here, but ideally the user can set them anywhere/anytime
input.setKeys(INPUT_MAP);

export default input;
