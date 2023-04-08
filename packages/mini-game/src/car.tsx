import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// @ts-ignore
import carUri from "./assets/models/car.glb";

export function Car() {
  let mesh = useLoader(GLTFLoader, carUri).scene;

  useEffect(() => {
    mesh.scale.set(0.0012, 0.0012, 0.0012);
    mesh.children[0].position.set(-365, -18, -67);
  }, [mesh]);
  return <primitive object={mesh} rotation-y={Math.PI} />;
}
