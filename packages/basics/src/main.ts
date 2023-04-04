import { PerspectiveCameraParams, PlaneGeometryParams } from "shared/types";
import * as THREE from "three";
import { OrbitControls } from "three-full/sources/controls/OrbitControls";

import { addGui } from "./add-gui";
import { animate } from "./animate";
import { handleMouseMove } from "./handle-mouse-move";
import type { ConfigMouse } from "./local-types";
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
    x: undefined,
    y: undefined,
};

export const config = {
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
const appDiv = document.querySelector<HTMLDivElement>(appReference);

if (!appDiv) {
    throw new Error(`Unable to sense a DOM Element named '${appReference}'!`);
}

const planeGeometry = new THREE.PlaneGeometry(
    config.plane.width,
    config.plane.height,
    config.plane.widthSegments,
    config.plane.heightSegments
);
const planeMaterial = new THREE.MeshPhongMaterial({
    // color: 0xff0000,
    side: THREE.DoubleSide,
    flatShading: true,
    vertexColors: true,
});

const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

// Mutate z-index to make the plane bumpy
makeBumpyPlane(planeMesh);

// Add dat.Gui interface for easy value changes
addGui({ planeMesh, config });
scene.add(planeMesh);

const frontLight = new THREE.DirectionalLight(0xffffff, 1);
frontLight.position.set(0, 0, 1);
scene.add(frontLight);

const backLight = new THREE.DirectionalLight(0xffffff, 1);
backLight.position.set(0, 0, -1);
scene.add(backLight);

const renderer = new THREE.WebGL1Renderer({
    // antialias: true,
    // canvas,
});
renderer.setSize(appDiv.offsetWidth, appDiv.offsetHeight);
renderer.setPixelRatio(devicePixelRatio);
appDiv.appendChild(renderer.domElement);

new OrbitControls(camera, appDiv);

camera.position.z = 5;

animate({ camera, mouse: config.mouse, planeMesh, renderer, scene });

// BEGIN Event Listeners

window.addEventListener("mousemove", (evt) => {
    handleMouseMove(evt);
});
