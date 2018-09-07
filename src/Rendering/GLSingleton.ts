import { Singleton } from "../Utils/Singleton";

// a singleton to hold the current GL instance
export class GLContext {
	private static instance: GLContext;
	private glContext?: WebGL2RenderingContext;

	private constructor() {
	}

	public static getGLContext(): WebGL2RenderingContext | undefined {
		return GLContext.instance.glContext;
	}

	public static updateGLContext(newGLContext: WebGL2RenderingContext) {
		GLContext.instance.glContext = newGLContext;
	}

	public static getInstance(): GLContext {
		if (!GLContext.instance) {
			GLContext.instance = new GLContext();
		}
		return GLContext.instance;
	}

	public static createNewInstance(gl: WebGL2RenderingContext) {
		GLContext.instance = new GLContext();
		GLContext.instance.glContext = gl;
	}
}