import { CompressedLightCube } from "./CompressedLightCube";

export class LeafAmbientLighting {
	public cube: CompressedLightCube;
	public x: number;
	public y: number;
	public z: number;
	public pad: number;
	
	constructor(cube: CompressedLightCube, x: number, y: number, z: number, pad: number) {
		this.cube = cube;
		this.x = x;
		this.y = y;
		this.z = z;
		this.pad = pad;
	}

	public toString() {
		return `Cube: 
${this.cube}
XYZ: [${this.x}, ${this.y}, ${this.z}]`;
	}
}