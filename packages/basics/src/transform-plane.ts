import * as THREE from "three";

export function transformPlane(
    planeMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshPhongMaterial>
) {
    makePlaneBumpy(planeMesh);
    changePlaneColor(planeMesh);
}

function makePlaneBumpy(
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
}

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
