"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BinaryReader_1 = require("./BinaryReader");
var BSP = /** @class */ (function () {
    function BSP(bsp) {
        var _this = this;
        this.gameLumpDict = {};
        console.log("--Reading " + bsp.name + "--");
        this.file = bsp;
        // read file contents into ArrayBuffer
        var reader = new FileReader();
        reader.onload = function (e) {
            if (e.target == null) {
                return;
            }
            _this.fileData = e.target.result;
            _this.readBSP();
        };
        reader.readAsArrayBuffer(bsp);
    }
    BSP.prototype.readBSP = function () {
        this.bspReader = new BinaryReader_1.BinaryReader(this.fileData);
        this.readHeader();
    };
    BSP.prototype.readHeader = function () {
        console.log("--Header--");
        this.ident = "";
        for (var i = 0; i < 4; i++) {
            this.ident += this.bspReader.readChar();
        }
        console.log("Ident: " + this.ident);
        this.version = this.bspReader.readInt32();
        console.log("Version: " + this.version);
    };
    return BSP;
}());
exports.BSP = BSP;
