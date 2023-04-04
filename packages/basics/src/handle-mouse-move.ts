import { config } from "./main";

export function handleMouseMove(evt: MouseEvent) {
    config.mouse.x = (evt.clientX / innerWidth) * 2 - 1;
    config.mouse.y = -(evt.clientY / innerHeight) * 2 + 1;
}
