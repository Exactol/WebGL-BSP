// A C# style Binary Reader

export const INT_8_SIZE = 1;
export const INT_16_SIZE = 2;
export const INT_32_SIZE = 4;

export const UINT_8_SIZE = 1;
export const UINT_16_SIZE = 2;
export const UINT_32_SIZE = 4;

export const FLOAT_SIZE = 4; // float32
export const DOUBLE_SIZE = 8; // float64

export const BOOL_SIZE = 1;

export const CHAR_SIZE = 1;

export class BinaryReader {
	public buffer: ArrayBuffer;
	public position: number;
	public length: number;

	constructor(data: ArrayBuffer, offset = 0) {
		this.buffer = data;

		// start position at 0 by default
		this.position = offset;
		this.length = data.byteLength;
	}

	// public static fromInt8Array(data: Int8Array) {
		
	// }
	
	public readInt8(): number {
		if (this.position + INT_8_SIZE > this.length) {
			throw new Error("RangeError");
		}
		const retVal = new Int8Array(this.buffer, this.position, 1)[0];

		// move position forward
		this.position += INT_8_SIZE;
		return retVal;
	}

	public readInt16(): number {
		if (this.position + INT_16_SIZE > this.length) {
			throw new Error("RangeError");
		}
		const retVal = new Int16Array(this.buffer, this.position, 1)[0];

		// move position forward
		this.position += INT_16_SIZE;
		return retVal;
	}

	public readInt32(): number {
		if (this.position + INT_32_SIZE > this.length) {
			throw new Error("RangeError");
		}
		const retVal = new Int32Array(this.buffer, this.position, 1)[0];

		// move position forward
		this.position += INT_32_SIZE;
		return retVal;
	}

	public readUInt8(): number {
		if (this.position + UINT_8_SIZE > this.length) {
			throw new Error("RangeError");
		}
		const retVal = new Uint8Array(this.buffer, this.position, 1)[0];

		// move position forward
		this.position += UINT_8_SIZE;
		return retVal;
	}

	public readUInt16(): number {
		if (this.position + UINT_16_SIZE > this.length) {
			throw new Error("RangeError");
		}
		const retVal = new Uint16Array(this.buffer, this.position, 1)[0];

		// move position forward
		this.position += UINT_16_SIZE;
		return retVal;
	}

	public readUInt32(): number {
		if (this.position + UINT_32_SIZE > this.length) {
			throw new Error("RangeError");
		}
		const retVal = new Uint32Array(this.buffer, this.position, 1)[0];
		
		// move position forward
		this.position += UINT_32_SIZE;
		return retVal;
	}

	public readFloat(): number {
		if (this.position + FLOAT_SIZE > this.length) {
			throw new Error("RangeError");
		}
		// console.log(`position: ${this.position}`);
		// console.log(`length: ${this.buffer.byteLength}`);
		const retVal = new Float32Array(this.buffer, this.position, 1)[0];
		
		// move position forward
		this.position += FLOAT_SIZE;
		return retVal;
	}

	public readDouble(): number {
		if (this.position + DOUBLE_SIZE > this.length) {
			throw new Error("RangeError");
		}
		// float 64 is a double
		const retVal = new Float64Array(this.buffer, this.position, 1)[0];
		
		// move position forward
		this.position += DOUBLE_SIZE;
		return retVal;
	}

	public readBoolean(): boolean {
		if (this.position + BOOL_SIZE > this.length) {
			throw new Error("RangeError");
		}
		// get bool as int
		const boolValInt = new Int8Array(this.buffer, this.position, 1)[0];

		// 0 = true, so if its not 0 it must be false
		const retVal = (boolValInt === 0);

		// move position forward
		this.position += BOOL_SIZE;
		return retVal;
	}

	public readBytes(numBytes: number): Uint8Array {
		if (this.position + numBytes > this.length) {
			throw new Error("RangeError");
		}
		const retVal = new Uint8Array(this.buffer, this.position, numBytes);
		
		// move position forward
		this.position += numBytes;
		return retVal;
	}

	public readChar(): string {
		if (this.position + CHAR_SIZE > this.length) {
			throw new Error("RangeError");
		}
		const retVal = String.fromCharCode(new Int8Array(this.buffer, this.position, 1)[0]);
		
		// move position forward
		this.position += CHAR_SIZE;
		return retVal;
	}
	
	// reads char, but doesn't move position forward
	public peekChar(): string {
		if (this.position + CHAR_SIZE > this.length) {
			throw new Error("RangeError");
		}
		const retVal = String.fromCharCode(new Int8Array(this.buffer, this.position, 1)[0]);

		return retVal;
	}

	public seek(numBytes: number, origin: SeekOrigin) {
		switch (origin) {
			case SeekOrigin.Beginning:
				if (numBytes > this.length) {
					throw new Error("RangeError");
				}

				this.position = numBytes;
				break;

			case SeekOrigin.Current:
				if (this.position + numBytes > this.length) {
					throw new Error("RangeError");
				}
		
				this.position += numBytes;
				break;

			case SeekOrigin.End:
				if (this.length + numBytes > this.length) {
					throw new Error("RangeError");
				}
				this.position = this.length + numBytes;
				break;
		}
	}
}

export enum SeekOrigin {
	Current,
	Beginning,
	End
}