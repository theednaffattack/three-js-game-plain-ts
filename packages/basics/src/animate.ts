import * as THREE from "three";
import type { Vector2 } from "three";

import type { ConfigMouse } from "./local-types";

interface AnimateArgs {
    camera: THREE.PerspectiveCamera;
    mouse: ConfigMouse;
    planeMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshPhongMaterial>;
    scene: THREE.Scene;
    renderer: THREE.WebGL1Renderer;
}

export function animate({
    camera,
    mouse,
    planeMesh,
    renderer,
    scene,
}: AnimateArgs) {
    const raycaster = new THREE.Raycaster();
    const animationId = requestAnimationFrame(() => {
        animate({ camera, mouse, planeMesh, renderer, scene });
    });
    renderer.render(scene, camera);

    raycaster.setFromCamera(mouse as Vector2, camera);
    const intersects = raycaster.intersectObject(planeMesh);

    if (intersects.length > 0) {
        console.log("VIEW INTERSECTS", intersects);
    }
    return animationId;
}
