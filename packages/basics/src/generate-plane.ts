// @ts-nocheck
import { PlaneGeometry } from "three";
import { changePlaneColor } from "./change-plane-color";

interface GeneratePlaneParams {
    planeMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshPhongMaterial>;
    config: {
        plane: {
            width?: number | undefined;
            height?: number | undefined;
            widthSegments?: number | undefined;
            heightSegments?: number | undefined;
        };
    };
}

export function generatePlane({ planeMesh, config }: GeneratePlaneParams) {
    planeMesh.geometry.dispose();
    planeMesh.geometry = new PlaneGeometry(
        config.plane.width,
        config.plane.height,
        config.plane.widthSegments,
        config.plane.widthSegments
    );

    // Alter planeMesh geometries
    // @ts-ignore
    const planeMeshArr = planeMesh.geometry.attributes.position.array;

    // Loop over every vertice in our PlaneMesh
    // to add visual effects
    for (let index = 0; index < planeMeshArr.length; index += 3) {
        const x = planeMeshArr[index];
        const y = planeMeshArr[index + 1];
        const z = planeMeshArr[index + 2];

        // Make the Plane bumpy by randomly making the peaks
        // different heights
        planeMeshArr[index] = x + Math.random() - 0.5;
        planeMeshArr[index + 1] = y + Math.random() - 0.5;
        planeMeshArr[index + 2] = z + Math.random();
    }

    planeMesh.geometry.attributes.position.originalPosition =
        planeMesh.geometry.attributes.position.array;

    changePlaneColor(planeMesh);
}
