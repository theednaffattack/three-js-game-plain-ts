import * as THREE from "three";
import { boxCollision } from "./box-collision";

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
    /**Speed with which to affect velocity. */
    speed: number;
    /**This represents the top coordinate of our Box. */
    top: number;
    /**This represents the left coordinate of our Box. */
    left: number;
    /**This represents the right coordinate of our Box. */
    right: number;
    /**This represents the front coordinate of our Box. */
    front: number;
    /**This represents the back coordinate of our Box. */
    back: number;
    /**The velocity of our object. By default velocity on all axes (x,y,z) is set to zero */
    velocity: { x: number; y: number; z: number };
    /**The width of our box. (x-axis) */
    width: number;
    /**Optional acceleration increase. */
    zAcceleration: boolean;
    constructor({
        color = "#00FF00",
        depth,
        height,
        position = { x: 0, y: 0, z: 0 },
        velocity = { x: 0, y: 0, z: 0 },
        width,
        zAcceleration = false,
    }: {
        color?: THREE.ColorRepresentation;
        depth: number;
        height: number;
        position?: { x: number; y: number; z: number };
        velocity?: { y: number; x: number; z: number };
        width: number;
        zAcceleration: boolean;
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

        this.top = this.position.y + this.height / 2;
        this.bottom = this.position.y - this.height / 2;
        this.left = this.position.x - this.width / 2;
        this.right = this.position.x + this.width / 2;

        this.front = this.position.z + this.depth / 2;
        this.back = this.position.z - this.depth / 2;

        this.gravity = 0.005;
        this.speed = 0.05;

        this.zAcceleration = zAcceleration;
    }

    updateSides() {
        this.left = this.position.x - this.width / 2;
        this.right = this.position.x + this.width / 2;

        this.bottom = this.position.y - this.height / 2;
        this.top = this.position.y + this.height / 2;

        this.front = this.position.z + this.depth / 2;
        this.back = this.position.z - this.depth / 2;
    }

    update(ground: Box) {
        this.updateSides();

        if (this.zAcceleration) {
            this.velocity.z += 0.0003;
        }

        this.position.x += this.velocity.x;
        this.position.z += this.velocity.z;

        this.applyGravity(ground);
    }

    applyGravity(ground: Box) {
        // Make our Box constantly fall
        this.velocity.y += -this.gravity;
        // Collision detection
        // bottom of cube collides w/ top of ground
        if (boxCollision({ box1: this, box2: ground })) {
            // This adds friction
            this.velocity.y *= 0.8;
            // This should bounce us by flipping our velocity
            this.velocity.y = -this.velocity.y;
        } else {
            // If we're not colliding with the ground,
            // keep adding velocity to our position
            this.position.y += this.velocity.y;
        }
    }
}
