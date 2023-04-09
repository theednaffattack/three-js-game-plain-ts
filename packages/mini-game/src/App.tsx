import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";

import { Scene } from "./scene";

function App() {
  return (
    <Canvas>
      <Physics broadphase="SAP" gravity={[0, -2.6, 0]}>
        <Scene />
      </Physics>
    </Canvas>
  );
}

export default App;
