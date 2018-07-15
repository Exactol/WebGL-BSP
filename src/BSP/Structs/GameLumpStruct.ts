export class GameLumpStruct {
	public id: number;
	public flags: number;
	public version: number;
	public fileOffset: number;
	public fileLength: number;

	constructor(id: number, flags: number, version: number, fileOffset: number, fileLength: number) {
		this.id = id;
		this.flags = flags;
		this.version = version;
		this.fileOffset = fileOffset;
		this.fileLength = fileLength;
	}

	public toString() {
		return `ID: ${this.id}
		Flags: ${this.flags}
		Version: ${this.version}
		FileOffset: ${this.fileOffset}
		FileLegnth: ${this.fileLength}
		`;
	}
}