import * as THREE from "three";

/**
 * Class Box extends THREE.Mesh and adds 'depth', 'height', and 'width' properties.
 */
export class Box extends THREE.Mesh {
    /**This represents the bottom coordinate of our Box. */
    bottom: number;
    /**The color of our Mesh material */
    color: THREE.ColorRepresentation;
    /**The depth of our box. (z-axis) */
    depth: number;
    /**Value representing our rate of fall (or bounce) */
    gravity: number;
    /**The height of our box. (y-axis) */
    height: number;
    /**This represents the top coordinate of our Box. */
    top: number;
    /**The velocity of our object. By default velocity on all axes (x,y,z) is set to zero */
    velocity: { x: number; y: number; z: number };
    /**The width of our box. (x-axis) */
    width: number;
    constructor({
        color = "#00FF00",
        depth,
        height,
        position = { x: 0, y: 0, z: 0 },
        velocity = { x: 0, y: 0, z: 0 },
        width,
    }: {
        color?: THREE.ColorRepresentation;
        depth: number;
        height: number;
        position?: { x: number; y: number; z: number };
        velocity?: { y: number; x: number; z: number };
        width: number;
    }) {
        super(
            new THREE.BoxGeometry(width, height, depth),
            new THREE.MeshStandardMaterial({ color })
        );

        this.color = color;
        this.depth = depth;
        this.height = height;
        this.width = width;
        this.velocity = velocity;
        this.position.set(position.x, position.y, position.z);

        this.bottom = this.position.y - this.height / 2;
        this.top = this.position.y + this.height / 2;
        this.gravity = 0.01;
    }

    update(ground: Box) {
        this.bottom = this.position.y - this.height / 2;
        this.top = this.position.y + this.height / 2;

        this.velocity.y += -this.gravity;

        this.position.y += this.velocity.y;
        // Collision detection
        // bottom of cube, top of ground
        if (this.bottom + this.velocity.y <= ground.top) {
            this.velocity.y = -this.velocity.y;
        }
    }
}
