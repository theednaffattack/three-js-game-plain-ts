import "./style.css";
import * as THREE from "three";
// import { OrbitControls } from "three-full/sources/controls/OrbitControls.js";

/**Camera with perspective projection. */
interface PerspectiveCameraArgs {
    /**Camera frustum vertical field of view. Default value is 50. */
    fov?: number | undefined;
    /**Camera frustum aspect ratio. Default value is 1. */
    aspect?: number | undefined;
    /**Camera frustum near plane. Default value is 0.1. */
    near?: number | undefined;
    /**Camera frustum far plane. Default value is 2000. */
    far?: number | undefined;
}

interface DirectionalLightArgs {
    color?: THREE.ColorRepresentation | undefined;
    intensity?: number | undefined;
}

const camConfig: PerspectiveCameraArgs = {
    fov: 75,
    aspect: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 1000,
};

const lightConfig: DirectionalLightArgs = { color: "#0xffffff", intensity: 1 };

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    camConfig.fov,
    camConfig.aspect,
    camConfig.near,
    camConfig.far
);

const renderer = new THREE.WebGL1Renderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// const controls = new OrbitControls(camera, renderer.domElement);
const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
scene.add(cube);

const ground = new THREE.Mesh(
    new THREE.BoxGeometry(5, 0.5, 10),
    new THREE.MeshStandardMaterial({ color: 0x0000ff })
);
ground.receiveShadow = true;
ground.position.y = -2;
scene.add(ground);

const light = new THREE.DirectionalLight(
    lightConfig.color,
    lightConfig.intensity
);
light.position.z = 3;
light.position.y = 2;
light.castShadow = true;
scene.add(light);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}

animate();
