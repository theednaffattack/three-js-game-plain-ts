import type * as THREE from "three";

import { Gsap, Mouse } from "./local-types";

export function animate({
    camera,
    group,
    gsap,
    mouse,
    renderer,
    scene,
    sphere,
}: {
    camera: THREE.PerspectiveCamera;
    group: THREE.Group;
    gsap: Gsap;
    mouse: Mouse;
    renderer: THREE.WebGL1Renderer;
    scene: THREE.Scene;
    sphere: THREE.Mesh<THREE.SphereGeometry, THREE.ShaderMaterial>;
}) {
    const animationId = requestAnimationFrame(() => {
        animate({
            camera,
            group,
            gsap,
            mouse,
            renderer,
            scene,
            sphere,
        });
    });

    renderer.render(scene, camera);
    sphere.rotation.y += 0.002;

    if (mouse.x && mouse.y) {
        // group.rotation.y = mouse.x * 0.5;
        gsap.to(group.rotation, {
            x: -mouse.y * 0.3,
            y: mouse.x * 0.5,
            duration: 2,
        });
    }
}
