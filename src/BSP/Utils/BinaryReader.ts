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
	public position: number;
	public length: number;
	public isLittleEndian: boolean;
	private dataView: DataView;

	constructor(data: ArrayBuffer, offset = 0, endianness = Endianness.LittleEndian) {
		this.dataView = new DataView(data);
		if (endianness === Endianness.LittleEndian) {
			this.isLittleEndian = true;
		} else {
			this.isLittleEndian = false;
		}

		// start position at 0 by default
		this.position = offset;
		this.length = data.byteLength;
	}
	
	public readInt8(): number {
		if (this.position + INT_8_SIZE > this.length) {
			throw new Error("RangeError");
		}
		const retVal = this.dataView.getInt8(this.position);

		// move position forward
		this.position += INT_8_SIZE;
		return retVal;
	}

	public readInt16(): number {
		if (this.position + INT_16_SIZE > this.length) {
			throw new Error("RangeError");
		}
		const retVal = this.dataView.getInt16(this.position, this.isLittleEndian);

		// move position forward
		this.position += INT_16_SIZE;
		return retVal;
	}

	public readInt32(): number {
		if (this.position + INT_32_SIZE > this.length) {
			throw new Error("RangeError");
		}
		const retVal = this.dataView.getInt32(this.position, this.isLittleEndian);

		// move position forward
		this.position += INT_32_SIZE;
		return retVal;
	}

	public readUInt8(): number {
		if (this.position + UINT_8_SIZE > this.length) {
			throw new Error("RangeError");
		}
		const retVal = this.dataView.getUint8(this.position);

		// move position forward
		this.position += UINT_8_SIZE;
		return retVal;
	}

	public readUInt16(): number {
		if (this.position + UINT_16_SIZE > this.length) {
			throw new Error("RangeError");
		}
		const retVal = this.dataView.getUint16(this.position, this.isLittleEndian);

		// move position forward
		this.position += UINT_16_SIZE;
		return retVal;
	}

	public readUInt32(): number {
		if (this.position + UINT_32_SIZE > this.length) {
			throw new Error("RangeError");
		}
		const retVal = this.dataView.getUint16(this.position, this.isLittleEndian);
		
		// move position forward
		this.position += UINT_32_SIZE;
		return retVal;
	}

	public readFloat(): number {
		if (this.position + FLOAT_SIZE > this.length) {
			throw new Error("RangeError");
		}
		const retVal = this.dataView.getFloat32(this.position, this.isLittleEndian);
		
		// move position forward
		this.position += FLOAT_SIZE;
		return retVal;
	}

	public readDouble(): number {
		if (this.position + DOUBLE_SIZE > this.length) {
			throw new Error("RangeError");
		}
		// float 64 is a double
		const retVal = this.dataView.getFloat64(this.position, this.isLittleEndian);
		
		// move position forward
		this.position += DOUBLE_SIZE;
		return retVal;
	}

	public readBoolean(): boolean {
		if (this.position + BOOL_SIZE > this.length) {
			throw new Error("RangeError");
		}
		// get bool as int
		const boolValInt = this.dataView.getInt8(this.position);

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
		const retVal = new Uint8Array(this.dataView.buffer, this.position, numBytes);
		
		// move position forward
		this.position += numBytes;
		return retVal;
	}

	public readChar(): string {
		if (this.position + CHAR_SIZE > this.length) {
			throw new Error("RangeError");
		}
		const retVal = String.fromCharCode(this.dataView.getInt8(this.position));
		
		// move position forward
		this.position += CHAR_SIZE;
		return retVal;
	}
	
	// reads char, but doesn't move position forward
	public peekChar(): string {
		if (this.position + CHAR_SIZE > this.length) {
			throw new Error("RangeError");
		}
		const retVal = String.fromCharCode(this.dataView.getInt8(this.position));

		return retVal;
	}

	// reads null terminated string
	public readString(err = true): string | null {
		if (this.position + CHAR_SIZE > this.length) {
			// optional arg to either raise error or return null
			if (err) {
				throw new Error("RangeError");
			} else {
				return null;
			}
		}
		
		let retStr = "";
		let nextChar = this.readChar();
		while (nextChar !== "\0" && this.position + CHAR_SIZE <= this.length) {
			retStr += nextChar;
			nextChar = this.readChar();
		}

		return retStr;
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
	End,
}

export enum Endianness {
	LittleEndian,
	BigEndian,
}