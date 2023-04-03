import type { ColorRepresentation } from "three";

/**Camera with perspective projection. */
export interface PerspectiveCameraArgs {
  /**Camera frustum vertical field of view. Default value is 50. */
  fov?: number | undefined;
  /**Camera frustum aspect ratio. Default value is 1. */
  aspect?: number | undefined;
  /**Camera frustum near plane. Default value is 0.1. */
  near?: number | undefined;
  /**Camera frustum far plane. Default value is 2000. */
  far?: number | undefined;
}

export interface LightArgs {
  color: ColorRepresentation;
  intensity: number;
}
/**
 * The geometry is created by sweeping and calculating vertexes around the Y axis (horizontal sweep) and the Z axis (vertical sweep). Thus, incomplete spheres (akin to 'sphere slices') can be created through the use of different values of phiStart, phiLength, thetaStart and thetaLength, in order to define the points in which we start (or end) calculating those vertices.
 */
export interface SphereGeometryArgs {
  /**sphere radius. Default is 50. */
  radius?: number | undefined;
  /**number of horizontal segments. Minimum value is 3, and the default is 32. */
  widthSegments?: number | undefined;
  /**number of vertical segments. Minimum value is 2, and the default is 16. */
  heightSegments?: number | undefined;
  /**specify horizontal starting angle. Default is 0. */
  phiStart?: number | undefined;
  /**specify horizontal sweep angle size. Default is Math.PI * 2. */
  phiLength?: number | undefined;
  /**specify vertical starting angle. Default is 0. */
  thetaStart?: number | undefined;
  /**specify vertical sweep angle size. Default is Math.PI. */
  thetaLength?: number | undefined;
}
