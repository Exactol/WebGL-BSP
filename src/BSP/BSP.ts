import { BinaryReader } from "./Utils/BinaryReader";
import { LumpType } from "./Lumps/LumpType";
import { HeaderLump } from "./Lumps/HeaderLump";
import { Lump } from "./Lumps/Lump";
import { EdgeLump } from "./Lumps/EdgeLump";
import { GenericLump } from "./Lumps/GenericLump";
import { VertexLump } from "./Lumps/VertexLump";
import { PlaneLump } from "./Lumps/PlaneLump";
import { SurfEdgeLump } from "./Lumps/SurfEdgeLump";

// https://developer.valvesoftware.com/wiki/Source_BSP_File_Format
export class BSP {
	public file: File;
	public fileData!: ArrayBuffer;
	public bspReader!: BinaryReader;

	public ident!: string;
	public version!: number;

	public headerLumps: HeaderLump[] = [];
	public lumps: { [lumpType: number]: Lump } = {};

	constructor(bsp: File, callback?: (BSP) => void) {
		console.log("--Reading " + bsp.name + "--");
		this.file = bsp;

		// read file contents into ArrayBuffer
		const reader = new FileReader();
		
		reader.onload = (e) => {
			if (e.target == null) {
				throw new Error("BSP Read Error");
			}
			this.fileData = e.target.result;
			
			this.readBSP();

			if (callback != null) {
				callback(this);
			} else {
				// todo research events more
				const event = new Event("bspOnLoad");
			}
		};
		reader.readAsArrayBuffer(bsp);
	}

	public readBSP() {
		this.bspReader = new BinaryReader(this.fileData);
		this.readHeader();
	}

	public readHeader() {
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
			// case LumpType.Entities:
			// 	// return new EntityLump()
			// 	break;
			case LumpType.Planes:
				return PlaneLump;
			// case LumpType.TexData:
				
			// 	break;		
			case LumpType.Vertexes:
				return VertexLump;
			// case LumpType.Visibility:
				
			// 	break;		
			// case LumpType.Nodes:
				
			// 	break;		
			// case LumpType.TexInfo:
				
			// 	break;		
			// case LumpType.Faces:
				
			// 	break;		
			// case LumpType.Lighting:
				
			// 	break;		
			// case LumpType.Occlusion:
				
			// 	break;		
			// case LumpType.Leafs:
				
			// 	break;		
			// case LumpType.FaceIds:
				
			// 	break;		
			case LumpType.Edges:
				return EdgeLump;
			case LumpType.SurfEdges:
				return SurfEdgeLump;
			// case LumpType.Models:
				
			// 	break;		
			// case LumpType.WorldLights:
				
			// 	break;		
			// case LumpType.LeafFaces:
				
			// 	break;		
			// case LumpType.LeafBrushes:
				
			// 	break;		
			// case LumpType.Brushes:
				
			// 	break;		
			default:
				return GenericLump;
		}
	}
}

