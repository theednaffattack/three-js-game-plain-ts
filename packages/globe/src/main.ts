import * as THREE from "three";
import { OrbitControls } from "three-full/sources/controls/OrbitControls.js";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

import "./style.css";
import { animate } from "./animate";
import { config } from "./config";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    config.cam.fov,
    config.cam.aspect,
    config.cam.near,
    config.cam.far
);

const renderer = new THREE.WebGL1Renderer({ antialias: true });

// Set the size of our 3D object to window width and height
renderer.setSize(innerWidth, innerHeight);

// Set the pixel ratio to match our device for greater clarity
renderer.setPixelRatio(window.devicePixelRatio);

const parentId = "app";
const appDiv = document.getElementById(parentId);

if (!appDiv) {
    throw new Error(`A div with an id of 'app' is missing!`);
}

// Add our 3D object to the DOM
appDiv.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// Create a sphere
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(
        config.sphere.radius,
        config.sphere.widthSegments,
        config.sphere.heightSegments
    ),
    new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            globeTexture: {
                value: new THREE.TextureLoader().load("./img/globe3.jpeg"),
            },
        },
    })
);

// Place the sphere within our scene
scene.add(sphere);

// Create an atmosphere
const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(
        config.sphere.radius,
        config.sphere.widthSegments,
        config.sphere.heightSegments
    ),
    new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
    })
);

atmosphere.scale.set(1.1, 1.1, 1.1);

// Place the sphere within our scene
scene.add(atmosphere);

// Set camera position to be something less than
// our sphere radius.
camera.position.z = 15;

// Pass our 3D elements to the animation loop
animate({ renderer, scene, camera });
