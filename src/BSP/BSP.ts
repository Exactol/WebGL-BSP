import { BinaryReader } from "./Utils/BinaryReader";
import { LumpType } from "./Lumps/LumpType";
import { HeaderLump } from "./Lumps/HeaderLump";
import { Lump } from "./Lumps/Lump";
import { EdgeLump } from "./Lumps/EdgeLump";
import { GenericLump } from "./Lumps/GenericLump";
import { VertexLump } from "./Lumps/VertexLump";

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
			// this.headerLumps.push(new HeaderLump(i, this.bspReader.readBytes(16)));
			this.lumps[i] = this.createLump(i, new HeaderLump(i, this.bspReader.readBytes(16)));
		}

		// 
	}

	public getLump(lumpType: LumpType) {
		// check if lump has already been read
		if (this.lumps[lumpType].initialized) {
			return this.lumps[lumpType];
		}

		const lType = this.getType(lumpType);

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

	private createLump(lumpType: LumpType, headerLump: HeaderLump): Lump {
		switch (lumpType) {
			// case LumpType.Entities:
			// 	// return new EntityLump()
			// 	break;
			// case LumpType.Planes:
				
			// 	break;		
			// case LumpType.TexData:
				
			// 	break;		
			case LumpType.Vertexes:
				return new VertexLump(headerLump, this.fileData);
				break;			
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
				return new EdgeLump(headerLump, this.fileData);
				break;		
			// case LumpType.SurfEdges:
				
			// 	break;		
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
				return new GenericLump(headerLump, this.fileData);
				break;
		}
	}

	private getType(lumpType: LumpType) {
		switch (lumpType) {
			// case LumpType.Entities:
			// 	// return new EntityLump()
			// 	break;
			// case LumpType.Planes:
				
			// 	break;		
			// case LumpType.TexData:
				
			// 	break;		
			// case LumpType.Vertexes:
				
			// 	break;		
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
				break;		
			// case LumpType.SurfEdges:
				
			// 	break;		
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
				break;
		}		
	}
}

