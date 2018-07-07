"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// wrap angle between 0 and 360 degrees
function wrapAngle(angle) {
    while (angle >= 360) {
        angle -= 360;
    }
    while (angle < 0) {
        angle += 360;
    }
    return angle;
}
exports.wrapAngle = wrapAngle;
