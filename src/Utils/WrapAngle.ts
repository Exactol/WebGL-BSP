// wrap angle between 0 and 360 degrees
export function wrapAngle(angle: number) {
	
	while (angle >= 360) {
		angle -= 360;
	}

	while (angle < 0) {
		angle += 360;
	}
	return angle;
}