import * as THREE from "three";

export function changePlaneColor(
    planeMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshPhongMaterial>
) {
    const savedColors = {
        red: [1, 0, 0],
        green: [0, 1, 0],
        blue: [0, 0, 1],
        darkishBlueColor: [0, 0.19, 0.4],
    };
    const colors = [];
    for (
        let index = 0;
        index < planeMesh.geometry.attributes.position.count;
        index++
    ) {
        colors.push(...savedColors.darkishBlueColor);
    }

    planeMesh.geometry.setAttribute(
        "color",
        new THREE.BufferAttribute(new Float32Array(colors), 3)
    );
}
