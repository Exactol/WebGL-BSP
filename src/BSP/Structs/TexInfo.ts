import { SurfFlags } from "./Enums";

export class TexInfo {
	public textureVecs: number[][];
	public lightmapVecs: number[][];
	public flags: SurfFlags;
	public texData: number;

	constructor(texVecs: number[][], lightVecs: number[][], flags: number, texData: number) {
		this.textureVecs = texVecs;
		this.lightmapVecs = lightVecs;
		this.flags = flags;
		this.texData = texData;
	}

	public toString() {
		return `Texture Vecs: [${this.textureVecs.join("], [")}]
		Lightmap Vecs: [${this.lightmapVecs.join("], [")}]
		Flags: ${this.flags}
		TexData: ${this.texData}`;
	}
}

