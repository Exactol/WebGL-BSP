import { ColorRGBExp32 } from "./ColorRGBExp32";

export class CompressedLightCube {
	public color: [ColorRGBExp32, ColorRGBExp32, ColorRGBExp32, ColorRGBExp32, ColorRGBExp32, ColorRGBExp32];

	constructor(color: [ColorRGBExp32, ColorRGBExp32, ColorRGBExp32, ColorRGBExp32, ColorRGBExp32, ColorRGBExp32]) {
		this.color = color;
	}

	public toString() {
		return `Color:
	${this.color.join("\n	")}`;
	}
}