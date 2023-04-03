import * as THREE from "three";
import { renderer } from "./main";

interface AnimateArgs {
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
}

export function animate({ scene, camera }: AnimateArgs) {
    const animationId = requestAnimationFrame(() => {
        animate({ scene, camera });
    });
    renderer.render(scene, camera);
    // scene.rotation.x += 0.01;
    return animationId;
}
