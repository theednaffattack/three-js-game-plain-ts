import "./style.css";
import * as THREE from "three";
import { animate } from "./animate";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    1000
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

console.log(sphere);

// function animate() {
//     const animationId = requestAnimationFrame(animate);

//     renderer.render(scene, camera);
// }

// animate();
animate({ renderer, scene, camera });
