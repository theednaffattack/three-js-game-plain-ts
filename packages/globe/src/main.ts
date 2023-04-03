import * as THREE from "three";
import { OrbitControls } from "three-full/sources/controls/OrbitControls.js";
import gsap from "gsap";

import "./style.css";
import { animate } from "./animate";
import { config } from "./config";
import type { Mouse } from "./local-types";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import atmosphereVertexShader from "./shaders/atmosphereVertex.glsl";
import atmosphereFragmentShader from "./shaders/atmosphereFragment.glsl";
const globeContainer =
    document.querySelector<HTMLDivElement>("#globe-container");
if (!globeContainer) {
    throw new Error("Can't sense a div with ID 'globe-container'!");
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    config.cam.fov,
    globeContainer.clientWidth / globeContainer.clientHeight, // config.cam.aspect,
    config.cam.near,
    config.cam.far
);

const canvas = document.querySelector("#globe");
if (!canvas) {
    throw new Error("Unable to find a canvas with ID 'globe'!");
}

// Add our 3D object to the DOM
const renderer = new THREE.WebGL1Renderer({
    antialias: true,
    canvas,
});

// Set the size of our 3D object to window width and height
renderer.setSize(globeContainer.offsetWidth, globeContainer.offsetHeight);

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
                value: new THREE.TextureLoader().load("./img/globe.jpeg"),
            },
        },
    })
);

// Create atmosphere
const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(
        config.sphere.radius,
        config.sphere.widthSegments,
        config.sphere.heightSegments
    ),
    new THREE.ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
    })
);

atmosphere.scale.set(1.1, 1.1, 1.1);

// Place the sphere within our scene
scene.add(atmosphere);

const group = new THREE.Group();

// Place the sphere within our group
group.add(sphere);
// Place the group within the scene
scene.add(group);

const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
});

const starVertices = [];

for (let index = 0; index < 10_000; index++) {
    const x = (Math.random() - 0.5) * 2_000;
    const y = (Math.random() - 0.5) * 2_000;
    const z = -Math.random() * 2_000;
    starVertices.push(x, y, z);
}

starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starVertices, 3)
);

const stars = new THREE.Points(starGeometry, starMaterial);

scene.add(stars);

// Set camera position to be something less than
// our sphere radius.
camera.position.z = 15;

const mouse: Mouse = { x: undefined, y: undefined };

// Pass our 3D elements to the animation loop
animate({ camera, group, gsap, mouse, renderer, scene, sphere });

// BEGIN Event Listeners

addEventListener("mousemove", (evt) => {
    mouse.x = (evt.clientX / innerWidth) * 2 - 1;
    mouse.y = (evt.clientY / innerHeight) * 2 + 1;
});
