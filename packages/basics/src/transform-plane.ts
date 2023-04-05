import * as THREE from "three";
import { changePlaneColor } from "./change-plane-color";

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
