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

// Set the size of our 3D object to window width and height
renderer.setSize(innerWidth, innerHeight);

const appDiv = document.getElementById("app");

if (!appDiv) {
    throw new Error("A div with an id of 'app' is missing!");
}

// Add our 3D object to the DOM
appDiv.appendChild(renderer.domElement);

// Create a sphere
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(
        config.sphere.radius,
        config.sphere.widthSegments,
        config.sphere.heightSegments
    ),
    new THREE.MeshBasicMaterial({
        // color: 0xff0000
        map: new THREE.TextureLoader().load("./img/globe.jpeg"),
    })
);

// Place the sphere within our scene
scene.add(sphere);

// Set camera position to be something less than
// our sphere radius.
camera.position.z = 15;

// Pass our 3D elements to the animation loop
animate({ renderer, scene, camera });
