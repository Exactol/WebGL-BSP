#version 300 es

in (location=0) vec4 aPosition;
in (location=1) vec4 aColor;
in (location=2) vec4 aNormal;

uniform mat4 uModelViewMat;
uniform mat4 uProjectionMat;

void main() {
	gl_Position = uProjectionMat * uModelViewMat * aPosition;
}