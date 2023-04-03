import * as THREE from "three";
import { PerspectiveCameraArgs } from "shared/types";

import "./style.css";

const configPerspectiveCamera: PerspectiveCameraArgs = {
    fov: 75,
    aspect: innerWidth / innerHeight,
    near: 0.1,
    far: 1000,
};

const configBoxGeometry = {
    width: 1,
    length: 1,
    height: 1,
};

const config = { cam: configPerspectiveCamera, box: configBoxGeometry };

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

const renderer = new THREE.WebGL1Renderer();

renderer.setSize(app.offsetWidth, app.offsetHeight);

app.appendChild(renderer.domElement);

const boxGeometry = new THREE.BoxGeometry(
    config.box.width,
    config.box.height,
    config.box.length
);

const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

const mesh = new THREE.Mesh(boxGeometry, material);
scene.add(mesh);
