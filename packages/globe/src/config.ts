import { PerspectiveCameraArgs } from "shared/types";

const cameraConfig: PerspectiveCameraArgs = {
    fov: 75,
    aspect: innerWidth / innerHeight,
    near: 0.1,
    far: 1000,
};

export const config = { cam: cameraConfig };
