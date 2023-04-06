import { Canvas } from "@react-three/fiber";

import { Box } from "./components/box";
import "./app.css";
import { TopNav } from "./components/top-nav";

function App() {
  return (
    <>
      <TopNav />
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </>
  );
}

export default App;
