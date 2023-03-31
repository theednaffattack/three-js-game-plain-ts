import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three-full/sources/controls/OrbitControls.js";

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

const config: PerspectiveCameraArgs = {
    fov: 75,
    aspect: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 1000,
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    config.fov,
    config.aspect,
    config.near,
    config.far
);

const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}

animate();
