import { BrushContent } from "./Brush";

export class Leaf {
	public contents: BrushContent;
	public cluster: number;

	// area and flags share a 16 bit bitbuffer
	public area: number; // 9 bits
	public flags: number; // 7 bits

	public mins: [number, number, number];
	public maxs: [number, number, number];

	public firstLeafFace: number;
	public numLeafFaces: number;

	public firstLeafBrush: number;
	public numLeafBrushes: number;

	public leafWaterDataID: number;

	// todo. bsp 19 and below only
	// public ambientLightingData: CompressedLightCube
	// padding: number;

	public constructor(contents: BrushContent, cluster: number,  area: number, flags: number, 
		mins: [number, number, number], maxs: [number, number, number], firstLeafFace: number, numLeafFaces: number,
		firstLeafBrush: number, numLeafBrushes: number, leafWaterDataID: number) {
	
		this.contents = contents;
		this.cluster = cluster;
		this.area = area;
		this.flags = flags;
		this.mins = mins;
		this.maxs = maxs;
		this.firstLeafFace = firstLeafFace;
		this.numLeafFaces = numLeafFaces;
		this.firstLeafBrush = firstLeafBrush;
		this.numLeafBrushes = numLeafBrushes;
		this.leafWaterDataID = leafWaterDataID;
	} 

		public toString() {
			return `Contents: ${this.contents} 
			Cluster: ${this.cluster}
			Area: ${this.area}
			Flags: ${this.flags}
			Mins: ${this.mins}
			Maxs: ${this.maxs}
			FirstLeafBrush: ${this.firstLeafBrush}
			NumLeafFaces: ${this.numLeafFaces}
			FirstLeafBrush: ${this.firstLeafBrush}
			NumLeafBrushes: ${this.numLeafBrushes}
			LeafWaterDataID: ${this.leafWaterDataID}
			`;
		}
}