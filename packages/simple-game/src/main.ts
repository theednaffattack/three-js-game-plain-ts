import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three-full/sources/controls/OrbitControls.js";
import { Box } from "./Box";
import { boxCollision } from "./box-collision";

/**Camera with perspective projection. */
interface PerspectiveCameraArgs {
    /**Camera frustum vertical field of view. Default value is 50. */
    fov?: number | undefined;
    /**Camera frustum aspect ratio. Default value is 1. */
    aspect?: number | undefined;
    /**Camera frustum near plane. Default value is 0.1. */
    near?: number | undefined;
    /**Camera frustum far plane. Default value is 2000. */
    far?: number | undefined;
}

interface DirectionalLightArgs {
    color?: THREE.ColorRepresentation | undefined;
    intensity?: number | undefined;
}

const camConfig: PerspectiveCameraArgs = {
    fov: 75,
    aspect: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 1000,
};

const lightConfig: DirectionalLightArgs = { color: "#ffffff", intensity: 1 };

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    camConfig.fov,
    camConfig.aspect,
    camConfig.near,
    camConfig.far
);

const container = document.getElementById("app");
const renderer = new THREE.WebGL1Renderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);

container?.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const cube = new Box({
    height: 1,
    width: 1,
    depth: 1,
    velocity: { x: 0, y: -0.01, z: 0 },
    zAcceleration: false,
});
cube.castShadow = true;
scene.add(cube);

const ground = new Box({
    width: 5,
    height: 0.5,
    depth: 10,
    color: "#0000FF",
    position: { x: 0, y: -2, z: 0 },
    zAcceleration: false,
});

ground.receiveShadow = true;
scene.add(ground);

const light = new THREE.DirectionalLight(
    lightConfig.color,
    lightConfig.intensity
);

light.position.z = 3;
light.position.y = 2;
light.castShadow = true;
scene.add(light);

camera.position.z = 5;
interface PressedState {
    pressed: boolean;
}
interface Keys {
    a: PressedState;
    d: PressedState;
    w: PressedState;
    s: PressedState;
    ArrowUp: PressedState;
    ArrowDown: PressedState;
    ArrowLeft: PressedState;
    ArrowRight: PressedState;
}
const keys: Keys = {
    a: { pressed: false },
    d: { pressed: false },
    w: { pressed: false },
    s: { pressed: false },
    ArrowUp: { pressed: false },
    ArrowDown: { pressed: false },
    ArrowLeft: { pressed: false },
    ArrowRight: { pressed: false },
};

const enemy = new Box({
    color: "red",
    depth: 1,
    height: 1,
    position: { x: 0, y: 0, z: -4 },
    velocity: { x: 0, y: 0, z: 0.01 },
    width: 1,
    zAcceleration: true,
});
enemy.castShadow = true;
scene.add(enemy);

const enemies = [enemy];

let isPaused = false;
const pauseButton = document.getElementById("pause-button");
pauseButton?.addEventListener("click", handlePauseButton);

let frames = 0;

// BEGIN Functions
function animate() {
    const animationId = requestAnimationFrame(animate);
    renderer.render(scene, camera);

    // Movement code
    // Set initial velocity to zero
    cube.velocity.x = 0;
    cube.velocity.z = 0;

    // Monitor keys object to apply velocity
    if (keys.a.pressed || keys.ArrowLeft.pressed) {
        cube.velocity.x = -cube.speed;
    } else if (keys.d.pressed || keys.ArrowRight.pressed) {
        cube.velocity.x = cube.speed;
    }

    if (keys.w.pressed || keys.ArrowUp.pressed) {
        cube.velocity.z = -cube.speed;
    } else if (keys.s.pressed || keys.ArrowDown.pressed) {
        cube.velocity.z = cube.speed;
    }

    cube.update(ground);

    enemies.forEach((enemy) => {
        enemy.update(ground);
        if (boxCollision({ box1: cube, box2: enemy })) {
            cancelAnimationFrame(animationId);
        }
    });

    frames++;
}

function handlePauseButton(_evt: MouseEvent) {
    isPaused = !isPaused;
}

function handleKeyDown(evt: KeyboardEvent) {
    const controlKeys = [
        "KeyA",
        "KeyS",
        "KeyD",
        "KeyW",
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
    ];

    if (controlKeys.includes(evt.code)) {
        // Only move if it's a game control key
        switch (evt.code) {
            case "KeyA":
                keys.a.pressed = true;
                break;
            case "KeyD":
                keys.d.pressed = true;
                break;
            case "KeyW":
                keys.w.pressed = true;
                break;
            case "KeyS":
                keys.s.pressed = true;
                break;
            case "ArrowLeft":
                keys.ArrowLeft.pressed = true;
                break;
            case "ArrowRight":
                keys.ArrowRight.pressed = true;
                break;
            case "ArrowUp":
                keys.ArrowUp.pressed = true;
                break;
            case "ArrowDown":
                keys.ArrowDown.pressed = true;
                break;

            default:
                break;
        }
    }
}

function handleKeyUp(evt: KeyboardEvent) {
    const controlKeys = [
        "KeyA",
        "KeyS",
        "KeyD",
        "KeyW",
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
    ];

    if (controlKeys.includes(evt.code)) {
        // Only move if it's a game control key
        switch (evt.code) {
            case "KeyA":
                keys.a.pressed = false;
                break;
            case "KeyD":
                keys.d.pressed = false;
                break;
            case "KeyW":
                keys.w.pressed = false;
                break;
            case "KeyS":
                keys.s.pressed = false;
                break;
            case "ArrowLeft":
                keys.ArrowLeft.pressed = false;
                break;
            case "ArrowRight":
                keys.ArrowRight.pressed = false;
                break;
            case "ArrowUp":
                keys.ArrowUp.pressed = false;
                break;
            case "ArrowDown":
                keys.ArrowDown.pressed = false;
                break;

            default:
                break;
        }
    }
}
// END Functions

// BEGIN Event Listeners
window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);
// END Event Listeners

// Kick-off our game
animate();
