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

export enum SurfFlags {
	LIGHT = 0x1,
	SKY2D = 0x2,
	SKY = 0x4,
	WARP = 0x8,
	TRANS = 0x10,
	NO_PORTAL = 0x20,
	TRIGGER = 0x40,
	NODRAW = 0x80,
	HINT = 0x100,
	SKIP = 0x200,
	NO_LIGHT = 0x400,
	BUMP_LIGHT = 0x800,
	NO_SHADOWS = 0x1000,
	NO_DECALS = 0x2000,
	NO_CHOP = 0x4000,
	HITBOX = 0x8000,
}