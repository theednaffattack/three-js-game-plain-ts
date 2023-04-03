import * as THREE from "three";
import { PerspectiveCameraParams, PlaneGeometryParams } from "shared/types";

import "./style.css";
import { animate } from "./animate";

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

const config = { cam: configPerspectiveCamera, plane: configPlaneGeometry };

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

export const renderer = new THREE.WebGL1Renderer({
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

// @ts-ignore
const planeMeshArr = planeMesh.geometry.attributes.position.array;

for (let index = 0; index < planeMeshArr.length; index += 3) {
    const x = planeMeshArr[index];
    const y = planeMeshArr[index + 1];
    const z = planeMeshArr[index + 2];

    planeMeshArr[index + 2] = z + Math.random();
}

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1);
scene.add(light);

camera.position.z = 5;

animate({ scene, camera });
