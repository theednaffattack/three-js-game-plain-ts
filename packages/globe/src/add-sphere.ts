import * as THREE from "three";

export function addSphere(scene: THREE.Scene) {
    // const stars: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>[] =
    //     [];
    const numberOfStars = 10_000;
    // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position.
    for (let z = -numberOfStars; z < numberOfStars; z += 20) {
        // Make a sphere (exactly the same as before).
        let geometry = new THREE.SphereGeometry(0.5, 32, 32);
        let material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        let sphere = new THREE.Mesh(geometry, material);

        // This time we give the sphere random x and y positions between -500 and 500
        sphere.position.x = Math.random() * 1000 - 500;
        sphere.position.y = Math.random() * 1000 - 500;

        // Then set the z position to where it is in the loop (distance of camera)
        sphere.position.z = z;

        // scale it up a bit
        sphere.scale.x = sphere.scale.y = 2;

        //add the sphere to the scene
        scene.add(sphere);

        // //finally push it to the stars array
        // stars.push(sphere);
    }
    // return stars;
}
