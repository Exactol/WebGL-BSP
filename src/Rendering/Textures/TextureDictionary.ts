import { Texture } from "./Texture";

// a singleton to hold all of the textures
export class TextureDictionary {
	private static instance: TextureDictionary;

	private textures: Texture[] = [];
	private arrayTexture!: WebGLTexture;
	private readonly height = 1;
	private readonly width = 1;
	private readonly internalFormat = WebGL2RenderingContext.RGBA8;
	private currentArrayIndex: number = 0;

	public static createNewInstance(gl: WebGL2RenderingContext) {
		TextureDictionary.instance = new TextureDictionary(gl);
	}

	public static getInstance(): TextureDictionary {
		return this.instance;
	}

	private constructor(gl: WebGL2RenderingContext) {

		const texture = gl.createTexture();
		if (texture === null) {
			console.log("Failed to create array texture");
			return;
		}
		gl.activeTexture(gl.TEXTURE0);

		this.arrayTexture = texture;
		gl.bindTexture(gl.TEXTURE_2D_ARRAY, texture);
		const mipmapLevels = 0; // mipmap level
		const maxLayers = 255; // TODO: increase? max supported layers are 255
		
		// create the array texture that will hold all of the other textures
		// textures are stored in the z axis of the texture
		gl.texImage3D(gl.TEXTURE_2D_ARRAY, mipmapLevels, this.internalFormat, this.width, this.height, maxLayers, 
			0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(repeatArray([0, 0, 0, 255], maxLayers)));

		gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_WRAP_S, gl.REPEAT);
		gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_WRAP_T, gl.REPEAT);
	}

	public addTexture(gl: WebGL2RenderingContext, texture: Texture): number {
		// make sure that texture is not already stored
		for (const key in this.textures) {
			if (this.textures.hasOwnProperty(key)) {
				if (texture.name === this.textures[key].name) {
					return this.textures[key].id;
				}
			}
		}

		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D_ARRAY, this.arrayTexture);

		const colorArray: number[] = [];
		for (const index in texture.placeholderColor) {
			if (texture.placeholderColor.hasOwnProperty(index)) {
				colorArray.push(texture.placeholderColor[index]);
			}
		}

		gl.texSubImage3D(gl.TEXTURE_2D_ARRAY, 
			0, // mipmap number
			0, 0, this.currentArrayIndex, // xOffset, yOffset, zOffset
			this.width, this.height, 1, // height, width, depth
			gl.RGBA, gl.UNSIGNED_BYTE, 
			new Uint8Array(colorArray));

		texture.id = this.currentArrayIndex;
		this.textures.push(texture);

		this.currentArrayIndex++;
		return this.currentArrayIndex - 1;
	}

	public getTextureIndex(name: string): number {
		// tslint:disable-next-line:prefer-for-of
		for (let i = 0; i < this.textures.length; i++) {
			if (this.textures[i].name === name) {
				return this.textures[i].id;
			}
		}

		return -1;
	}
}

// from https://stackoverflow.com/a/50672288
function repeatArray<T>(array: T[], numTimesRepeat: number): T[] {
	return [].concat(...Array(numTimesRepeat).fill(array));
}