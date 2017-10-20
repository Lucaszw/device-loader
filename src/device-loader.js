const Backbone = require('Backbone');
const yo = require('yo-yo');
const MicrodropAsync = require("@microdrop/async");

class DeviceLoader extends UIPlugin {
  constructor(elem, focusTracker) {
    super(elem, focusTracker, "DeviceLoader");
    this.microdrop = new MicrodropAsync();
    this.model = new Backbone.Model();
    this.render();
  }
  listen() {
    this.onStateMsg("device-model", "device", this.onDeviceSet.bind(this));
    this.model.on("change", this.render.bind(this));
  }
  get controls() {return this._controls}
  set controls(controls) {
    if (this.controls) this.element.removeChild(this.controls);
    this.element.appendChild(controls);
    this._controls = controls;
  }
  async openFile() {
    // Load device:
    const response = await this.microdrop.device.loadFromFilePrompt();
    return response;
  }
  onDeviceSet(payload) {
    const data = JSON.parse(payload);
    console.log(data);
    this.model.set("filename", data.svg_filepath);
  }
  render() {
    const node = yo`
    <div>
      <input disabled type="text" value="${this.model.get("filename")}" />
      <button class="btn btn-secondary btn-sm" onclick=${this.openFile.bind(this)}>Upload</button>
    </div>`;
    this.element.innerHTML = "";
    this.element.appendChild(node);
  }
  // ** Static Methods **
  static position() {
    /* topLeft, topRight, bottomLeft, or bottomRight */
    return "bottomLeft";
  }
}

module.exports = DeviceLoader;
