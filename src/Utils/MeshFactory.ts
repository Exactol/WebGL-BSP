import { Vertex } from "./Vertex";
import { vec4 } from "gl-matrix";

export class MeshFactory {
	public static createSolidCube(sideLength: number = 10, color: vec4 = vec4.fromValues(1, 0, 0, 1)): Vertex[] {
		sideLength = sideLength / 2; // half side length, otherwise creates cube with 2x length requested

		return [
			new Vertex(vec4.fromValues(-sideLength, -sideLength, -sideLength, 1.0),   color),
			new Vertex(vec4.fromValues(-sideLength, -sideLength, sideLength, 1.0),    color),
			new Vertex(vec4.fromValues(-sideLength, sideLength, -sideLength, 1.0),    color),
			new Vertex(vec4.fromValues(-sideLength, sideLength, -sideLength, 1.0),    color),
			new Vertex(vec4.fromValues(-sideLength, -sideLength, sideLength, 1.0),    color),
			new Vertex(vec4.fromValues(-sideLength, sideLength, sideLength, 1.0),     color),

			new Vertex(vec4.fromValues(sideLength, -sideLength, -sideLength, 1.0),    color),
			new Vertex(vec4.fromValues(sideLength, sideLength, -sideLength, 1.0),     color),
			new Vertex(vec4.fromValues(sideLength, -sideLength, sideLength, 1.0),     color),
			new Vertex(vec4.fromValues(sideLength, -sideLength, sideLength, 1.0),     color),
			new Vertex(vec4.fromValues(sideLength, sideLength, -sideLength, 1.0),     color),
			new Vertex(vec4.fromValues(sideLength, sideLength, sideLength, 1.0),      color),

			new Vertex(vec4.fromValues(-sideLength, -sideLength, -sideLength, 1.0),   color),
			new Vertex(vec4.fromValues(sideLength, -sideLength, -sideLength, 1.0),    color),
			new Vertex(vec4.fromValues(-sideLength, -sideLength, sideLength, 1.0),    color),
			new Vertex(vec4.fromValues(-sideLength, -sideLength, sideLength, 1.0),    color),
			new Vertex(vec4.fromValues(sideLength, -sideLength, -sideLength, 1.0),    color),
			new Vertex(vec4.fromValues(sideLength, -sideLength, sideLength, 1.0),     color),

			new Vertex(vec4.fromValues(-sideLength, sideLength, -sideLength, 1.0),    color),
			new Vertex(vec4.fromValues(-sideLength, sideLength, sideLength, 1.0),     color),
			new Vertex(vec4.fromValues(sideLength, sideLength, -sideLength, 1.0),     color),
			new Vertex(vec4.fromValues(sideLength, sideLength, -sideLength, 1.0),     color),
			new Vertex(vec4.fromValues(-sideLength, sideLength, sideLength, 1.0),     color),
			new Vertex(vec4.fromValues(sideLength, sideLength, sideLength, 1.0),      color),

			new Vertex(vec4.fromValues(-sideLength, -sideLength, -sideLength, 1.0),   color),
			new Vertex(vec4.fromValues(-sideLength, sideLength, -sideLength, 1.0),    color),
			new Vertex(vec4.fromValues(sideLength, -sideLength, -sideLength, 1.0),    color),
			new Vertex(vec4.fromValues(sideLength, -sideLength, -sideLength, 1.0),    color),
			new Vertex(vec4.fromValues(-sideLength, sideLength, -sideLength, 1.0),    color),
			new Vertex(vec4.fromValues(sideLength, sideLength, -sideLength, 1.0),     color),

			new Vertex(vec4.fromValues(-sideLength, -sideLength, sideLength, 1.0),    color),
			new Vertex(vec4.fromValues(sideLength, -sideLength, sideLength, 1.0),     color),
			new Vertex(vec4.fromValues(-sideLength, sideLength, sideLength, 1.0),     color),
			new Vertex(vec4.fromValues(-sideLength, sideLength, sideLength, 1.0),     color),
			new Vertex(vec4.fromValues(sideLength, -sideLength, sideLength, 1.0),     color),
			new Vertex(vec4.fromValues(sideLength, sideLength, sideLength, 1.0),      color)
		];
	}
}