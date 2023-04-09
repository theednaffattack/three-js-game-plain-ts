const debug = true;

interface WheelDebugArgs {
  debug?: boolean | undefined;
  radius: number;
  wheelRef: any;
}

export function WheelDebug({ debug, radius, wheelRef }: WheelDebugArgs) {
  if (debug) {
    return (
      <group ref={wheelRef}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[radius, radius, 0.015, 16]} />
          <meshNormalMaterial transparent={true} opacity={0.25} />
        </mesh>
      </group>
    );
  } else {
    return null;
  }
}
