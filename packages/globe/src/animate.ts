import type * as THREE from "three";

export function animate({
    renderer,
    scene,
    camera,
    sphere,
}: {
    renderer: THREE.WebGL1Renderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    sphere: THREE.Mesh<THREE.SphereGeometry, THREE.ShaderMaterial>;
}) {
    const animationId = requestAnimationFrame(() => {
        animate({
            renderer,
            scene,
            camera,
            sphere,
        });
    });

    renderer.render(scene, camera);
    sphere.rotation.y += 0.01;
}
