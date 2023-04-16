import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";

import { Scene } from "./scene";

function App() {
  // const animate = useRef<"isPaused" | "isPlaying">("isPlaying");
  const [gameStatus, setGameStatus] = useState<"isPaused" | "isPlaying">(
    "isPaused"
  );
  // if (animate.current === "isPlaying") {
  // }

  return (
    <>
      <Canvas>
        <Physics
          isPaused={gameStatus === "isPaused"}
          broadphase="SAP"
          gravity={[0, -2.6, 0]}
        >
          <Scene gameStatus={gameStatus} setGameStatus={setGameStatus} />
        </Physics>
      </Canvas>
    </>
  );
}

export default App;
