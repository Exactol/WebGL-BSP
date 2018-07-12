export class Face {
	public planeNum: number;
	public side: number;
	public onNode: number;
	public firstEdge: number;
	public numEdges: number;
	public texInfo: number;
	public dispInfo: number;
	public surfaceFogVolumeID: number;
	public style: Int8Array;
	public lightOfs: number;
	public area: number;
	public lightmapTextureMinsInLuxels: [number, number];
	public lightmapTextureSizeInLuxels: [number, number];
	public origFace: number;
	public numPrims: number;
	public firstPrimID: number;
	public smoothingGroups: number;

	constructor(planeNum: number, side: number, onNode: number, firstEdge: number, numEdges: number, 
		texInfo: number, dispInfo: number, surfFogVolID: number, style: Int8Array, lightOfs: number,
		area: number, lightTexMin: [number, number], lightTexSize: [number, number], origFace: number, numPrims: number, 
		firstPrimID: number, smoothingGroups: number) {
			this.planeNum = planeNum;
			this.side = side;
			this.onNode = onNode;
			this.firstEdge = firstEdge;
			this.numEdges = numEdges;
			this.texInfo = texInfo;
			this.dispInfo = dispInfo;
			this.surfaceFogVolumeID = surfFogVolID;
			this.style = style;
			this.lightOfs = lightOfs;
			this.area = area;
			this.lightmapTextureMinsInLuxels = lightTexMin;
			this.lightmapTextureSizeInLuxels = lightTexSize;
			this.origFace = origFace;
			this.numPrims = numPrims;
			this.firstPrimID = firstPrimID;
			this.smoothingGroups = smoothingGroups;
	}

	public toString() {
		return `PlaneNum: ${this.planeNum}
		Side: ${this.side}
		First Edge: ${this.firstEdge}
		Num Edges: ${this.numEdges}
		Smoothing Group: ${this.smoothingGroups}
		`;
	}
}