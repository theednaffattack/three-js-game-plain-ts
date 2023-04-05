// @ts-nocheck
import * as THREE from "three";
import type { Vector2 } from "three";
import gsap from "gsap";

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
        const hoverColor = { r: 0.1, g: 0.5, b: 1 };
        // vertice 1
        color.setX(intersects[0].face.a, hoverColor.r);
        color.setY(intersects[0].face.a, hoverColor.g);
        color.setZ(intersects[0].face.a, hoverColor.b);

        // vertice 2
        color.setX(intersects[0].face.b, hoverColor.r);
        color.setY(intersects[0].face.b, hoverColor.g);
        color.setZ(intersects[0].face.b, hoverColor.b);

        // vertice 3
        color.setX(intersects[0].face.c, hoverColor.r);
        color.setY(intersects[0].face.c, hoverColor.g);
        color.setZ(intersects[0].face.c, hoverColor.b);

        color.needsUpdate = true;

        const initialColor = { r: 0, g: 0.19, b: 0.4 };
        // gsap.fromTo({}, initialColor, { ...hoverColor, onUpdate: () => {} });
        gsap.to(hoverColor, {
            r: initialColor.r,
            g: initialColor.g,
            b: initialColor.b,
            onUpdate: () => {
                // vertice 1
                color.setX(intersects[0].face.a, hoverColor.r);
                color.setY(intersects[0].face.a, hoverColor.g);
                color.setZ(intersects[0].face.a, hoverColor.b);

                // vertice 2
                color.setX(intersects[0].face.b, hoverColor.r);
                color.setY(intersects[0].face.b, hoverColor.g);
                color.setZ(intersects[0].face.b, hoverColor.b);

                // vertice 3
                color.setX(intersects[0].face.c, hoverColor.r);
                color.setY(intersects[0].face.c, hoverColor.g);
                color.setZ(intersects[0].face.c, hoverColor.b);
                color.needsUpdate = true;
            },
        });
    }
    return animationId;
}
