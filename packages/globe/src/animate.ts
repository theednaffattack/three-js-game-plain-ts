import type * as THREE from "three";

export function animate({
    renderer,
    scene,
    camera,
}: {
    renderer: THREE.WebGL1Renderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
}) {
    const animationId = requestAnimationFrame(() => {
        animate({
            renderer,
            scene,
            camera,
        });
    });

    renderer.render(scene, camera);
}
