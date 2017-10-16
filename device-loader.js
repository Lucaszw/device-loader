var DeviceLoader =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class DeviceLoader extends UIPlugin {
  constructor(elem, focusTracker) {
    super(elem, focusTracker, "DeviceLoader");
    this.controls = this.Controls();
    this.listen();
  }
  listen() {
    this.bindTriggerMsg("device-model", "load-device", "send-file");
  }
  get controls() {return this._controls}
  set controls(controls) {
    if (this.controls) this.element.removeChild(this.controls);
    this.element.appendChild(controls);
    this._controls = controls;
  }
  loadFile(file) {
    console.log("load file called");
    const reader = new FileReader();
    reader.onload = () => {
      this.trigger("send-file", this.wrapData(null, this.File(file,reader)))}
    reader.readAsText(file);
  }
  openFile() {
    const input = D("<input type='file'/>");
    input.on("change", (e) => this.loadFile(input.el.files[0]));
    input.click();
  }
  File(file, reader) {
    return {name: file.name, file: reader.result};
  }
  Controls() {
    // Textfield:
    const uploadTextfield = $("<input type='text' disabled />");
    const uploadButton = $("<button>Upload</button>");
    const container = $("<div></div");
    uploadButton.on("click", this.openFile.bind(this));
    container.append(uploadTextfield);
    container.append(uploadButton);
    return container[0];
  }
  // ** Static Methods **
  static position() {
    /* topLeft, topRight, bottomLeft, or bottomRight */
    return "bottomLeft";
  }
}

module.exports = DeviceLoader;


/***/ })
/******/ ]);