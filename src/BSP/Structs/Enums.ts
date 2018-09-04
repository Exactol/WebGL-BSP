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

// ---------------------------------------------------------
// displacement enums
// ---------------------------------------------------------

// tslint:disable-next-line:max-line-length
// https://github.com/ValveSoftware/source-sdk-2013/blob/0d8dceea4310fde5706b3ce1c70609d72a38efdf/sp/src/public/bspfile.h#L157
export enum DispChildNode {
	CHILDNODE_UPPER_RIGHT = 0,
	CHILDNODE_UPPER_LEFT = 1,
	CHILDNODE_LOWER_LEFT = 2,
	CHILDNODE_LOWER_RIGHT = 3,
}

export enum DispCorner {
	CORNER_LOWER_LEFT = 0,
	CORNER_UPPER_LEFT = 1,
	CORNER_UPPER_RIGHT = 3,
	CORNER_LOWER_RIGHT = 2,
}

export enum DispNeighborEdge {
	NEIGHBOREDGE_LEFT = 0,
	NEIGHBOREDGE_TOP = 1,
	NEIGHBOREDGE_RIGHT = 2,
	NEIGHBOREDGE_BOTTOM = 3,
}

export enum DispSpan {
	CORNER_TO_CORNER = 0,
	CORNER_TO_MIDPOINT = 1,
	MIDPOINT_TO_CORNER = 2,
}

export enum DispOrientation {
	ORIENTATION_CCW_0 = 0,
	ORIENTATION_CCW_90 = 1,
	ORIENTATION_CCW_180 = 2,
	ORIENTATION_CCW_270 = 3,
}

export enum DispTags {
	DISPTRI_TAG_SURFACE = 0x1,
	DISPTRI_TAG_WALKABLE = 0x2,
	DISPTRI_TAG_BUILDABLE = 0x4,
	DISPTRI_FLAG_SURFPROP1 = 0x8,
	DISPTRI_FLAG_SURFPROP2 = 0x10,
}

// ---------------------------------------------------------