import gsap from "gsap";

export interface Mouse {
    x: number | undefined;
    y: number | undefined;
}

export type Gsap = typeof gsap;
