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
  color: THREE.ColorRepresentation;
  intensity: number;
}
