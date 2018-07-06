// limit angle between min and max
export function limitAngle(angle: number, min: number, max: number) {
	if (angle < min) {
		return min;
	} else if (angle > max) {
		return max;
	} else {
		return angle;
	}
}