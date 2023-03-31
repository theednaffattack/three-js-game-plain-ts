import * as THREE from "three";

/**
 * Class Box extends THREE.Mesh and adds 'depth', 'height', and 'width' properties.
 */
export class Box extends THREE.Mesh {
    /**The depth of our box. (z-axis) */
    depth: number;
    /**The height of our box. (y-axis) */
    height: number;
    /**The width of our box. (x-axis) */
    width: number;
    constructor({
        depth,
        height,
        width,
    }: {
        depth: number;
        height: number;
        width: number;
    }) {
        super(
            new THREE.BoxGeometry(width, height, depth),
            new THREE.MeshStandardMaterial({ color: 0x00ff00 })
        );

        this.depth = depth;
        this.height = height;
        this.width = width;
    }
}
