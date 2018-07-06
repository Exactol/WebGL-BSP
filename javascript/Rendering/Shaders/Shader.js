"use strict";
exports.__esModule = true;
function CreateShaderProgram(gl, shadersSource) {
    var compiledShaders = [];
    // compile each shader and filter out those that failed
    shadersSource.forEach(function (shader) {
        var compiledShader = LoadShader(gl, shader);
        if (compiledShader != null) {
            compiledShaders.push(compiledShader);
        }
    });
    // attach shaders to the program
    var shaderProgram = gl.createProgram();
    compiledShaders.forEach(function (shader) {
        gl.attachShader(shaderProgram, shader);
    });
    gl.linkProgram(shaderProgram);
    // check for errors
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.log("Unable to initialize shader program: " + gl.getProgramInfoLog(shaderProgram));
        return null;
    }
    // cleanup
    // compiledShaders.forEach(shader => {
    //     gl.detachShader(shaderProgram, shader);
    // });
    return shaderProgram;
}
exports.CreateShaderProgram = CreateShaderProgram;
function LoadShader(gl, shaderSource) {
    var shader = gl.createShader(shaderSource.type);
    // compile shader
    gl.shaderSource(shader, shaderSource.source);
    gl.compileShader(shader);
    // check for errors
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log("Failed to compile shader: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}
exports.LoadShader = LoadShader;
// function loadTextFile(url: string, callback: Function, gl: WebGLRenderingContext): void {
//     var request: XMLHttpRequest = new XMLHttpRequest();
//     request.open("GET", url, true);
//     request.addEventListener("load", function(): void {
//         callback(request.responseText, gl, urlToShaderType(url, gl));
//     });
//     request.send();
// }
// function urlToShaderType(url: string, gl: WebGLRenderingContext): GLenum | null {
//     // get extension
//     const extension: string | undefined = url.split(".").pop();
//     switch (extension) {
//         case "vert":
//             return gl.VERTEX_SHADER;
//         case "frag":
//             return gl.FRAGMENT_SHADER;
//         default:
//             return null;
//     }
// }
