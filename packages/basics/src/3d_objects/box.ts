import * as THREE from "three";

const configBoxGeometry = {
    width: 1,
    length: 1,
    height: 1,
};

const config = { box: configBoxGeometry };

const boxGeometry = new THREE.BoxGeometry(
    config.box.width,
    config.box.height,
    config.box.length
);

const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

export const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
