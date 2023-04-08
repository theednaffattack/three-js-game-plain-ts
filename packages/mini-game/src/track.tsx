import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";

import trackUri from "./assets/textures/track.png";
// @ts-ignore
import trackGlbUri from "./assets/models/track.glb";

export function Track() {
  const result = useLoader(GLTFLoader, trackGlbUri);

  const colorMap = useLoader(TextureLoader, trackUri);

  useEffect(() => {
    colorMap.anisotropy = 16;
  }, [colorMap]);

  // @ts-ignore
  let geometry = result.scene.children[0].geometry;

  return (
    <mesh>
      <primitive object={geometry} attach={"geometry"} />
      <meshBasicMaterial toneMapped={false} map={colorMap} />
    </mesh>
  );
}
