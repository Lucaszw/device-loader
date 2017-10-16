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
