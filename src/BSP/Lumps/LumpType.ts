export enum LumpType {
	Entities = 0,
	Planes = 1,
	TexData = 2,
	Vertexes = 3,
	Visibility = 4,
	Nodes = 5,
	TexInfo = 6,
	Faces = 7,
	Lighting = 8,
	Occlusion = 9,
	Leafs = 10,
	FaceIds = 11,
	Edges = 12,
	SurfEdges = 13,
	Models = 14,
	WorldLights = 15,
	LeafFaces = 16,
	LeafBrushes = 17,
	Brushes = 18,
	BrushSides = 19,
	Areas = 20,
	AreaPortals = 21,
	
	Portals = 22, // source 2004
	Unused0 = 22, // source 2007
	PropCollsion = 22, // source 2009
	
	Clusters = 23, // source 2004
	Unused1 = 23, // source 2007
	PropHulls = 23, // source 2009

	PortalVerts = 24, // source 2004
	Unused2 = 24, // source 2007
	PropHullVerts = 24, // source 2009

	ClusterPortals = 25, // source 2004
	Unused3 = 25, // source 2007
	PropTris = 25, // source 2009
	
	DispInfo = 26,
	OriginalFaces = 27,
	PhysDisp = 28,
	PhysCollide = 29,
	VertNormals = 30,
	VertNormalIndices = 31,
	DispLightmapAlphas = 32,
	DispVerts = 33,
	DispLightmapSamplePositions = 34,
	GameLump = 35,
	LeafWaterData = 36,
	Primitives = 37,
	PrimVerts = 38,
	PrimIndices = 39,
	Pakfile = 40,
	ClipPortalVerts = 41,
	Cubemaps = 42,
	TexDataStringData = 43,
	TexDataStringTable = 44,
	Overlays = 45,
	LeafMinDistToWater = 46,
	FaceMacroTextureInfo = 47,
	DispTris = 48,

	PhysCollideSurface = 49, // source 2004
	PropBlob = 49, // source 2007

	WaterOverlays = 50,

	LightmapPages = 51, // source 2006
	LeafAmbientIndexHdr = 51, // source 2007
	
	LightmapPagesInfo = 52, // source 2006
	LeafAmbientVertex = 52, // source 2007

	LightingHdr = 53,
	WorldLightsHdr = 54,
	LeafAmbientLightingHdr = 55,
	LeafAmbientLighting = 56,
	XZipPackfile = 57,
	FacesHdr = 58,
	MapFlags = 59,
	OverlayFades = 60,
	OverlaySystemLevels = 61,
	PhysLevel = 62,
	DispMultiBlend = 63,

	Generic = -1 // placeholder lump
}
