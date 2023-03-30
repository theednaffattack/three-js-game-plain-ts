import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three-full/sources/controls/OrbitControls.js";

interface PerspectiveCameraArgs {
    fov?: number | undefined;
    aspect?: number | undefined;
    near?: number | undefined;
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
