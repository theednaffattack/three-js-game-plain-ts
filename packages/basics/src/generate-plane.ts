import { PlaneGeometry } from "three";
import { changePlaneColor } from "./transform-plane";

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

    for (let index = 0; index < planeMeshArr.length; index += 3) {
        // const x = planeMeshArr[index];
        // const y = planeMeshArr[index + 1];
        const z = planeMeshArr[index + 2];

        planeMeshArr[index + 2] = z + Math.random();
    }

    changePlaneColor(planeMesh);
}
