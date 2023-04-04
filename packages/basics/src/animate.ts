// @ts-nocheck
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
        const { color } = intersects[0].object.geometry.attributes;

        // vertice 1
        color.setX(intersects[0].face.a, 0);
        color.setY(intersects[0].face.a, 0);
        color.setZ(intersects[0].face.a, 1);

        // vertice 2
        color.setX(intersects[0].face.b, 0);
        color.setY(intersects[0].face.b, 0);
        color.setZ(intersects[0].face.b, 1);

        // vertice 3
        color.setX(intersects[0].face.c, 0);
        color.setY(intersects[0].face.c, 0);
        color.setZ(intersects[0].face.c, 1);

        color.needsUpdate = true;
    }
    return animationId;
}
