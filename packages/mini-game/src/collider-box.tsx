import { Triplet, useBox } from "@react-three/cannon";
import { Vector3 } from "@react-three/fiber";

export function ColliderBox({
  debug = true,
  position,
  scale,
}: {
  debug?: boolean;
  position: Triplet;
  scale: Triplet;
}) {
  useBox(() => ({
    args: scale,
    position,
    type: "Static",
  }));
  return (
    <mesh position={position}>
      <boxGeometry args={scale} />
      <meshBasicMaterial transparent={true} opacity={0.25} />
    </mesh>
  );
}
