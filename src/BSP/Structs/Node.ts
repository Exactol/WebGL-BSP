export class Node {
	public planeNum: number;
	public children: [number, number];
	
	public mins: [number, number, number];
	public maxs: [number, number, number];

	public firstFace: number;
	public numFaces: number;

	public area: number;

	public padding: number; // padding to make it 32 bytes
	
	constructor(planeNum: number, children: [number, number], mins: [number, number, number], 
		maxs: [number, number, number], firstFace: number, numFaces: number, area: number, padding: number) {
			this.planeNum = planeNum;
			this.children = children;
			this.mins = mins;
			this.maxs = maxs;
			this.firstFace = firstFace;
			this.numFaces = numFaces;
			this.area = area;
			this.padding = padding;
	}

	public toString() {
		return `Node: 
			PlaneNum: ${this.planeNum}
			Children: ${this.children}
			Mins: [${this.mins.join(", ")}]
			Maxs: [${this.maxs.join(", ")}]
			FirstFace: ${this.firstFace}
			NumFaces: ${this.numFaces}
			Area: ${this.area}
			`;
	}
}