import { vec3 } from "gl-matrix";

export function arrayToVec3(arr: number[]) {
    return vec3.fromValues(arr[0], arr[1], arr[2]);
}