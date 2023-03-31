import "./style.css";
import * as THREE from "three";

import { OrbitControls } from "three-full/sources/controls/OrbitControls.js";
import { Box } from "./Box";

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

const lightConfig: DirectionalLightArgs = { color: "#0xffffff", intensity: 1 };

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    camConfig.fov,
    camConfig.aspect,
    camConfig.near,
    camConfig.far
);

const renderer = new THREE.WebGL1Renderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const cube = new Box({
    height: 1,
    width: 1,
    depth: 1,
    velocity: { x: 0, y: -0.01, z: 0 },
});
cube.castShadow = true;
scene.add(cube);

const ground = new Box({
    width: 5,
    height: 0.5,
    depth: 10,
    color: "#0000FF",
    position: { x: 0, y: -2, z: 0 },
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

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    cube.update(ground);
    // cube.position.y += -0.01;
}

animate();
