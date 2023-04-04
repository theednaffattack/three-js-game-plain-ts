import { PerspectiveCameraParams, PlaneGeometryParams } from "shared/types";
import * as THREE from "three";
import { OrbitControls } from "three-full/sources/controls/OrbitControls.js";

import { addGui } from "./add-gui";
import { animate } from "./animate";
import { makeBumpyPlane } from "./make-bumpy-plane";
import "./style.css";

const configPerspectiveCamera: PerspectiveCameraParams = {
    fov: 75,
    aspect: innerWidth / innerHeight,
    near: 0.1,
    far: 1000,
};

const configPlaneGeometry: PlaneGeometryParams = {
    width: 5,
    height: 5,
    widthSegments: 10,
    heightSegments: 10,
};

const configMouse: ConfigMouse = {
    x: null,
    y: null,
};

const config = {
    cam: configPerspectiveCamera,
    plane: configPlaneGeometry,
    mouse: configMouse,
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    config.cam.fov,
    config.cam.aspect,
    config.cam.near,
    config.cam.far
);

const appReference = "#app";
const app = document.querySelector<HTMLDivElement>(appReference);

if (!app) {
    throw new Error(`Unable to sense a DOM Element named '${appReference}'!`);
}

const renderer = new THREE.WebGL1Renderer({
    antialias: true,
});

renderer.setSize(app.offsetWidth, app.offsetHeight);
renderer.setPixelRatio(devicePixelRatio);

app.appendChild(renderer.domElement);

const planeGeometry = new THREE.PlaneGeometry(
    config.plane.width,
    config.plane.height,
    config.plane.widthSegments,
    config.plane.heightSegments
);
const planeMaterial = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
    flatShading: true,
});

const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(planeMesh);

// Mutate z-index to make the plane bumpy
makeBumpyPlane(planeMesh);

// Add dat.Gui interface for easy value changes
addGui({ planeMesh, config });

const frontLight = new THREE.DirectionalLight(0xffffff, 1);
frontLight.position.set(0, 0, 1);
scene.add(frontLight);

const backLight = new THREE.DirectionalLight(0xffffff, 1);
backLight.position.set(0, 0, -1);
scene.add(backLight);

new OrbitControls(camera, app);

camera.position.z = 5;

animate({ scene, camera, renderer });
