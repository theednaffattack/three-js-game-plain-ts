import "./style.css";
import * as THREE from "three";
import { animate } from "./animate";
import { config } from "./config";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    config.cam.fov,
    config.cam.aspect,
    config.cam.near,
    config.cam.far
);

const renderer = new THREE.WebGL1Renderer();

renderer.setSize(innerWidth, innerHeight);

const appDiv = document.getElementById("app");

if (!appDiv) {
    throw new Error("A div with an id of 'app' is missing!");
}

appDiv.appendChild(renderer.domElement);

// Create a sphere
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);

scene.add(sphere);

camera.position.z = 15;

animate({ renderer, scene, camera });

// DELETE BELOW

// function animate() {
//     const animationId = requestAnimationFrame(animate);

//     renderer.render(scene, camera);
// }

// animate();
