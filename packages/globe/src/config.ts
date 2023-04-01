import { PerspectiveCameraArgs, SphereGeometryArgs } from "shared/types";

const cameraConfig: PerspectiveCameraArgs = {
    fov: 75,
    aspect: innerWidth / innerHeight,
    near: 0.1,
    far: 1000,
};

const sphereGeometry: SphereGeometryArgs = {
    radius: 5,
    widthSegments: 50,
    heightSegments: 50,
};

export const config = { cam: cameraConfig, sphere: sphereGeometry };
