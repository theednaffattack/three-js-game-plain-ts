import ReactDOM from "react-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export function BasicScene() {
  return (
    <Canvas>
      <OrbitControls
        enableZoom={true}
        // rotateSpeed={2}
        // autoRotate={true}
        // autoRotateSpeed={5}
      />
      <ambientLight intensity={0.1} />
      <directionalLight color="red" position={[0, 0, 5]} />
      <directionalLight color="white" position={[0, 0, -5]} />
      Hello
      <mesh>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[2.5, 0, 0]}>
        <sphereGeometry />
        <meshNormalMaterial />
      </mesh>
      <mesh position={[5, 0, 0]}>
        <octahedronGeometry />
        <meshPhongMaterial />
      </mesh>
    </Canvas>
  );
}
