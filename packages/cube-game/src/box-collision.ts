import { Box } from "./Box";

export function boxCollision({ box1, box2 }: { box1: Box; box2: Box }) {
    const xCollision = box1.right >= box2.left && box1.left <= box2.right;
    const zCollision = box1.front >= box2.back && box1.back <= box2.front;
    const yCollision =
        box1.bottom + box1.velocity.y <= box2.top && box1.top >= box2.bottom;

    return xCollision && yCollision && zCollision;
}
