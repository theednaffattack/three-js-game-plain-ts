import * as THREE from "three";

interface AnimateArgs {
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    renderer: THREE.WebGL1Renderer;
}

export function animate({ scene, camera, renderer }: AnimateArgs) {
    const animationId = requestAnimationFrame(() => {
        animate({ scene, camera, renderer });
    });
    renderer.render(scene, camera);
    // scene.rotation.x += 0.01;
    return animationId;
}
