import type * as THREE from "three";
import { Mouse } from "./local-types";

export function animate({
    camera,
    group,
    mouse,
    renderer,
    scene,
    sphere,
}: {
    camera: THREE.PerspectiveCamera;
    group: THREE.Group;
    mouse: Mouse;
    renderer: THREE.WebGL1Renderer;
    scene: THREE.Scene;
    sphere: THREE.Mesh<THREE.SphereGeometry, THREE.ShaderMaterial>;
}) {
    const animationId = requestAnimationFrame(() => {
        animate({
            camera,
            group,
            mouse,
            renderer,
            scene,
            sphere,
        });
    });

    renderer.render(scene, camera);
    sphere.rotation.y += 0.01;

    if (mouse.x && mouse.y) {
        group.rotation.y = mouse.x * 0.5;
    }
}
