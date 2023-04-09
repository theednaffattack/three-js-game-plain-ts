const debug = true;

interface WheelDebugArgs {
  radius: number;
  wheelRef: any;
}

export function WheelDebug({ radius, wheelRef }: WheelDebugArgs) {
  return (
    <group ref={wheelRef}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[radius, radius, 0.015, 16]} />
        <meshNormalMaterial transparent={true} opacity={0.25} />
      </mesh>
    </group>
  );
}
