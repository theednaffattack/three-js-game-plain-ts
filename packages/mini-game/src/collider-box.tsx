import { Triplet, useBox } from "@react-three/cannon";
import { Vector3 } from "@react-three/fiber";

export function ColliderBox({
  debug = false,
  position,
  scale,
}: {
  debug?: boolean | undefined;
  position: Triplet;
  scale: Triplet;
}) {
  useBox(() => ({
    args: scale,
    position,
    type: "Static",
  }));
  if (debug) {
    return (
      <mesh position={position}>
        <boxGeometry args={scale} />
        <meshBasicMaterial transparent={true} opacity={0.25} />
      </mesh>
    );
  } else {
    return null;
  }
}
