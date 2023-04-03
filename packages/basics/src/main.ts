import * as THREE from "three";
import { PerspectiveCameraArgs } from "shared/types";

import "./style.css";

const configPerspectiveCamera: PerspectiveCameraArgs = {
    fov: 75,
    aspect: innerWidth / innerHeight,
    near: 0.1,
    far: 1000,
};

const config = { cam: configPerspectiveCamera };
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    config.cam.fov,
    config.cam.aspect,
    config.cam.near,
    config.cam.far
);
const renderer = new THREE.WebGL1Renderer();
