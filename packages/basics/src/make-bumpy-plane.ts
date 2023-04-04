import * as THREE from "three";

export function makeBumpyPlane(
    planeMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshPhongMaterial>
) {
    // @ts-ignore
    const planeMeshArr = planeMesh.geometry.attributes.position.array;

    // Alter planeMesh geometries
    for (let index = 0; index < planeMeshArr.length; index += 3) {
        // const x = planeMeshArr[index];
        // const y = planeMeshArr[index + 1];
        const z = planeMeshArr[index + 2];

        planeMeshArr[index + 2] = z + Math.random();
    }

    const colors = [];
    for (
        let index = 0;
        index < planeMesh.geometry.attributes.position.count;
        index++
    ) {
        colors.push(1, 0, 0);
    }

    planeMesh.geometry.setAttribute(
        "color",
        new THREE.BufferAttribute(new Float32Array(colors), 3)
    );
}
