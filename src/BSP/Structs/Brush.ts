export class Brush {
	public firstSide: number;
	public numSides: number;
	public contents: BrushContent;

	constructor(firstSide: number, numSides: number, contents: BrushContent) {
		this.firstSide = firstSide;
		this.numSides = numSides;
		this.contents = contents;
	}

	public toString() {
		return `FirstSide: ${this.firstSide}
		NumSides: ${this.numSides}
		Contents: ${BrushContent[this.contents]}`; // todo investigate brush contents showing up as undefined
	}
}

export enum BrushContent {
	EMPTY = 0,
	SOLID = 0x1,
	WINDOW = 0x2,
	AUX = 0x4,
	GRATE = 0x8,
	SLIME = 0x10,
	WATER = 0x20,
	MIST = 0x40,
	OPAQUE = 0x80,
	TEST_FOG_VOLUME = 0x100,
	UNUSED = 0x200,
	UNUSED6 = 0x400,
	TEAM1 = 0x800,
	TEAM2 = 0x1000,
	IGNORE_DRAW_OPAQUE = 0x2000,
	MOVEABLE = 0x4000,
	AREAPORTAL = 0x8000,
	PLAYERCLIP = 0x10000,
	MONSTERCLIP = 0x20000,
	CURRENT_0 = 0x40000,
	CURRENT_90 = 0x80000,
	CURRENT_180 = 0x100000,
	CURRENT_270 = 0x200000,
	CURRENT_UP = 0x400000,
	CURRENT_DOWN = 0x800000,
	ORIGIN = 0x1000000,
	MONSTER = 0x2000000,
	DEBRIS = 0x4000000,
	DETAIL = 0x8000000,
	TRANSLUCENT = 0x10000000,
	LADDER = 0x20000000,
	HITBOX = 0x40000000,
}