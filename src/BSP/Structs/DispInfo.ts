import { vec3 } from "gl-matrix";
import { DispNeighbor } from "./DispNeighbor";
import { DispSubNeighbor } from "./DispSubNeighbor";
import { DispCornerNeighbors } from "./DispCornerNeighbor";

export class DispInfo {
	public startPosition: vec3;
	public dispVertStart: number; // index into LUMP_DISP_VERTS
	public dispTriStart: number; // index into LUMP_DISP_TRIS
	public power: number;
	public minTess: number; // minimum tesselation allowed
	public smoothingAngle: number;
	public contents: number;
	public mapFace: number;
	public lightmapAlphaStart: number;
	public lightmapSamplePositionStart: number;
	public edgeNeighbors: DispNeighbor[];
	public cornerNeighbors: DispCornerNeighbors[];
	public allowedVerts: number[];
	
	constructor(startPosition: vec3, dispVertStart: number, dispTriStart: number, power: number, minTess: number,
			smoothingAngle: number, contents: number, mapFace: number, lightmapAlphaStart: number,
			lightmapSamplePositionStart: number, edgeNeighbors: DispNeighbor[], cornerNeighbors: DispCornerNeighbors[], 
			allowedVerts: number[]) {
		this.startPosition = startPosition;
		this.dispVertStart = dispVertStart;
		this.dispTriStart = dispTriStart;
		this.power = power;
		this.minTess = minTess;
		this.smoothingAngle = smoothingAngle;
		this.contents = contents;
		this.mapFace = mapFace;
		this.lightmapAlphaStart = lightmapAlphaStart;
		this.lightmapSamplePositionStart = lightmapSamplePositionStart;
		this.edgeNeighbors = edgeNeighbors;
		this.cornerNeighbors = cornerNeighbors;
		this.allowedVerts = allowedVerts;
	}

	// tslint:disable-next-line:max-line-length
	// from https://github.com/ValveSoftware/source-sdk-2013/blob/0d8dceea4310fde5706b3ce1c70609d72a38efdf/sp/src/public/bspfile.h#L648https://github.com/ValveSoftware/source-sdk-2013/blob/0d8dceea4310fde5706b3ce1c70609d72a38efdf/sp/src/public/bspfile.h#L648
	public numVerts(): number {
		return ((1 << this.power) + 1) * ((1 << this.power) + 1);
	}

	public numTris(): number {
		return (1 << this.power) * (1 << this.power) * 2;
	}
	
	public numRows(): number {
		return 2 ** this.power + 1;
	}

	public toString() {
		return `StartPos: ${this.startPosition}
		DispVertStart: ${this.dispVertStart}
		DispTriStart: ${this.dispTriStart}
		Power: ${this.power}
		Min Tess: ${this.minTess}
		Smoothing Angle: ${this.smoothingAngle}
		Contents: ${this.contents}
		Map Face: ${this.mapFace}
		LightmapAlphaStart: ${this.lightmapAlphaStart}
		LightmapSamplePositionStart: ${this.lightmapSamplePositionStart}
		CornerNeighbors: 
			${[this.cornerNeighbors.join("\n			")]}
		EdgeNeighbors: 
			${[this.edgeNeighbors.join("\n			")]}
		AllowedVerts: ${this.allowedVerts}
		`;
	}
}