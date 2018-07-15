import { BinaryReader } from "./Utils/BinaryReader";
import { LumpType } from "./Lumps/LumpType";
import { HeaderLump } from "./Lumps/HeaderLump";
import { Lump } from "./Lumps/Lump";
import { EdgeLump } from "./Lumps/EdgeLump";
import { GenericLump } from "./Lumps/GenericLump";
import { VertexLump } from "./Lumps/VertexLump";
import { PlaneLump } from "./Lumps/PlaneLump";
import { SurfEdgeLump } from "./Lumps/SurfEdgeLump";
import { FaceLump } from "./Lumps/FaceLump";
import { OriginalFaceLump } from "./Lumps/OriginalFaceLump";
import { BrushLump } from "./Lumps/BrushLump";
import { BrushSide } from "./Structs/BrushSide";
import { BrushSideLump } from "./Lumps/BrushSideLump";
import { NodeLump } from "./Lumps/NodeLump";
import { LeafLump } from "./Lumps/LeafLump";
import { LeafFaceLump } from "./Lumps/LeafFaceLump";
import { LeafBrushLump } from "./Lumps/LeafBrushLump";
import { TexInfoLump } from "./Lumps/TexInfoLump";
import { TexDataLump } from "./Lumps/TexDataLump";
import { TexDataStringTableLump } from "./Lumps/TexDataStringTableLump";
import { TexDataStringDataLump } from "./Lumps/TexDataStringDataLump";
import { ModelLump } from "./Lumps/ModelLump";
import { EntityLump } from "./Lumps/EntityLump";
import { GameLump } from "./Lumps/GameLump";
import { CubemapLump } from "./Lumps/CubemapLump";
import { LightingLump } from "./Lumps/LightingLump";

// https://developer.valvesoftware.com/wiki/Source_BSP_File_Format
export class BSP {
	public fileData!: ArrayBuffer;
	public bspReader!: BinaryReader;

	public ident!: string;
	public version!: number;

	public headerLumps: HeaderLump[] = [];
	public lumps: { [lumpType: number]: Lump } = {};

	constructor(bspData: ArrayBuffer) {
		this.fileData = bspData;
		this.bspReader = new BinaryReader(this.fileData);
		this.readHeader();
	}

	private readHeader() {
		console.log("--Header--");

		// read ident
		this.ident = "";
		for (let i = 0; i < 4; i++) {
			this.ident += this.bspReader.readChar();
		}
		console.log("Ident: " + this.ident);

		// read version
		this.version = this.bspReader.readInt32();
		console.log("Version: " + this.version);

		// read header lumps. Each lump is 16 bytes
		console.log("--Reading Header Lumps--");
		for (let i = 0; i < 64; i++) {
			// use helper function to convert LumpEnum to lump class
			const lumpType = this.getLumpType(i);
			this.lumps[i] = new lumpType(new HeaderLump(i, this.bspReader.readBytes(16)), this.fileData);
		}
	}

	public getLump(lumpType: LumpType) {
		// check if lump has already been read
		if (this.lumps[lumpType].initialized) {
			return this.lumps[lumpType];
		}

		const lump = this.lumps[lumpType];

		// make sure lumps that this lump depends on are read first
		lump.lumpDependencies.forEach((lumpDependency) => {
			this.getLump(lumpDependency);
		});

		lump.read();
		return lump;
	}

	public printLumps() {
		for (const lump in this.lumps) {
			if (this.lumps.hasOwnProperty(lump)) {
				const element = this.lumps[lump];
				console.log(element.toString());
			}
		}
	}

	private getLumpType(lumpType: LumpType) {
		switch (lumpType) {
			case LumpType.Entities:
				return EntityLump;
			case LumpType.Planes:
				return PlaneLump;
			case LumpType.TexData:	
				return TexDataLump;
			case LumpType.Vertexes:
				return VertexLump;
			// case LumpType.Visibility:	
			case LumpType.Nodes:
				return NodeLump;	
			case LumpType.TexInfo:
				return TexInfoLump;		
			case LumpType.Faces:
				return FaceLump;
			case LumpType.Lighting:	
				return LightingLump;
			// case LumpType.Occlusion:		
			case LumpType.Leafs:	
				return LeafLump;
			// case LumpType.FaceIds:
			case LumpType.Edges:
				return EdgeLump;
			case LumpType.SurfEdges:
				return SurfEdgeLump;
			case LumpType.Models:
				return ModelLump;
			// case LumpType.WorldLights:
			case LumpType.LeafFaces:
				return LeafFaceLump;
			case LumpType.LeafBrushes:
				return LeafBrushLump;
			case LumpType.Brushes:
				return BrushLump;
			case LumpType.BrushSides:
				return BrushSideLump;
			// case LumpType.Areas:
			// case LumpType.AreaPortals:
			// case LumpType.Portals:
			// case LumpType.Unused0:
			// case LumpType.PropCollsion:
			// case LumpType.Clusters:
			// case LumpType.Unused1:
			// case LumpType.PropHulls:
			// case LumpType.PortalVerts:
			// case LumpType.Unused2:
			// case LumpType.PropHullVerts:
			// case LumpType.ClusterPortals:
			// case LumpType.Unused3:
			// case LumpType.PropTris:
			// case LumpType.DispInfo:
			case LumpType.OriginalFaces:
				return OriginalFaceLump;
			// case LumpType.PhysDisp:
			// case LumpType.PhysCollide:
			// case LumpType.VertNormals:
			// case LumpType.VertNormalIndices:
			// case LumpType.DispLightmapAlphas:
			// case LumpType.DispVerts:
			// case LumpType.DispLightmapSamplePositions:
			case LumpType.Game:
				return GameLump;
			// case LumpType.LeafWaterData:
			// case LumpType.Primitives:
			// case LumpType.PrimVerts:
			// case LumpType.PrimIndices:
			// case LumpType.Pakfile:
			// case LumpType.ClipPortalVerts:
			case LumpType.Cubemaps:
				return CubemapLump;
			case LumpType.TexDataStringData:
				return TexDataStringDataLump;
			case LumpType.TexDataStringTable:
				return TexDataStringTableLump;
			// case LumpType.Overlays:
			// case LumpType.LeafMinDistToWater:
			// case LumpType.FaceMacroTextureInfo:
			// case LumpType.DispTris:
			// case LumpType.PhysCollideSurface:
			// case LumpType.PropBlob:
			// case LumpType.WaterOverlays:
			// case LumpType.LightmapPages:
			// case LumpType.LeafAmbientIndexHdr:
			// case LumpType.LightmapPageInfos:
			// case LumpType.LeafAmbientIndex:
			// case LumpType.LightingHdr:
			// case LumpType.WorldLightsHdr:
			// case LumpType.LeafAmbientLightingHdr:
			// case LumpType.LeafAmbientLighting:
			// case LumpType.XZipPackfile:
			// case LumpType.FacesHdr:
			// case LumpType.MapFlags:
			// case LumpType.OverlayFades:
			// case LumpType.OverlaySystemLevels:
			// case LumpType.PhysLevel:
			// case LumpType.DispMultiBlend:
				
			default:
				return GenericLump;
		}
	}
}

