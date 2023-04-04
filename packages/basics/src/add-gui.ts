import * as dat from "dat.gui";
import { generatePlane } from "./generate-plane";

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

export function addGui({ planeMesh, config }: GeneratePlaneParams) {
    const gui = new dat.GUI();

    gui.add(config.plane, "width", 1, 20).onChange(() => {
        generatePlane({ planeMesh, config });
    });

    gui.add(config.plane, "height", 1, 20).onChange(() => {
        generatePlane({ planeMesh, config });
    });

    gui.add(config.plane, "widthSegments", 1, 20).onChange(() => {
        generatePlane({ planeMesh, config });
    });

    gui.add(config.plane, "heightSegments", 1, 20).onChange(() => {
        generatePlane({ planeMesh, config });
    });
}
