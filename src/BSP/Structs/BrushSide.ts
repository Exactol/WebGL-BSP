export class BrushSide {
	public planeNum: number;
	public texInfo: number;
	public dispInfo: number;
	public bevel: number;

	constructor(planeNum: number, texInfo: number, dispInfo: number, bevel: number) {
		this.planeNum = planeNum;
		this.texInfo = texInfo;
		this.dispInfo = dispInfo;
		this.bevel = bevel;
	}

	public toString() {
		return `PlaneNum: ${this.planeNum}
		texInfo: ${this.texInfo}
		dispInfo: ${this.dispInfo}
		bevel: ${this.bevel}`;
	}
}