import { Vertex } from "./Vertex";
import { vec4, vec3 } from "gl-matrix";

export class MeshFactory {
	public static createSolidCube(sideLength: number = 10, color: vec4 = vec4.fromValues(255, 0, 0, 255)): Vertex[] {
		sideLength = sideLength / 2; // half side length, otherwise creates cube with 2x length requested

		return [
			new Vertex(vec3.fromValues(-sideLength, -sideLength, -sideLength),   color),
			new Vertex(vec3.fromValues(-sideLength, -sideLength, sideLength),    color),
			new Vertex(vec3.fromValues(-sideLength, sideLength, -sideLength),    color),
			new Vertex(vec3.fromValues(-sideLength, sideLength, -sideLength),    color),
			new Vertex(vec3.fromValues(-sideLength, -sideLength, sideLength),    color),
			new Vertex(vec3.fromValues(-sideLength, sideLength, sideLength),     color),

			new Vertex(vec3.fromValues(sideLength, -sideLength, -sideLength),    color),
			new Vertex(vec3.fromValues(sideLength, sideLength, -sideLength),     color),
			new Vertex(vec3.fromValues(sideLength, -sideLength, sideLength),     color),
			new Vertex(vec3.fromValues(sideLength, -sideLength, sideLength),     color),
			new Vertex(vec3.fromValues(sideLength, sideLength, -sideLength),     color),
			new Vertex(vec3.fromValues(sideLength, sideLength, sideLength),      color),

			new Vertex(vec3.fromValues(-sideLength, -sideLength, -sideLength),   color),
			new Vertex(vec3.fromValues(sideLength, -sideLength, -sideLength),    color),
			new Vertex(vec3.fromValues(-sideLength, -sideLength, sideLength),    color),
			new Vertex(vec3.fromValues(-sideLength, -sideLength, sideLength),    color),
			new Vertex(vec3.fromValues(sideLength, -sideLength, -sideLength),    color),
			new Vertex(vec3.fromValues(sideLength, -sideLength, sideLength),     color),

			new Vertex(vec3.fromValues(-sideLength, sideLength, -sideLength),    color),
			new Vertex(vec3.fromValues(-sideLength, sideLength, sideLength),     color),
			new Vertex(vec3.fromValues(sideLength, sideLength, -sideLength),     color),
			new Vertex(vec3.fromValues(sideLength, sideLength, -sideLength),     color),
			new Vertex(vec3.fromValues(-sideLength, sideLength, sideLength),     color),
			new Vertex(vec3.fromValues(sideLength, sideLength, sideLength),      color),

			new Vertex(vec3.fromValues(-sideLength, -sideLength, -sideLength),   color),
			new Vertex(vec3.fromValues(-sideLength, sideLength, -sideLength),    color),
			new Vertex(vec3.fromValues(sideLength, -sideLength, -sideLength),    color),
			new Vertex(vec3.fromValues(sideLength, -sideLength, -sideLength),    color),
			new Vertex(vec3.fromValues(-sideLength, sideLength, -sideLength),    color),
			new Vertex(vec3.fromValues(sideLength, sideLength, -sideLength),     color),

			new Vertex(vec3.fromValues(-sideLength, -sideLength, sideLength),    color),
			new Vertex(vec3.fromValues(sideLength, -sideLength, sideLength),     color),
			new Vertex(vec3.fromValues(-sideLength, sideLength, sideLength),     color),
			new Vertex(vec3.fromValues(-sideLength, sideLength, sideLength),     color),
			new Vertex(vec3.fromValues(sideLength, -sideLength, sideLength),     color),
			new Vertex(vec3.fromValues(sideLength, sideLength, sideLength),      color)
		];
	}
}