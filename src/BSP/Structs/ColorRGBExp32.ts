export class ColorRGBExp32	{
	public r: number;
	public g: number;
	public b: number;
	public e: number;

	public constructor(r: number, g: number, b: number, e: number) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.e = e;
	}

	public toString() {
		return `RGBE: [${this.r}, ${this.g}, ${this.b}] ${this.e}`;
	}
}