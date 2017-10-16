var webConfig = {
  entry: './src/device-loader.js',
  output: {
    filename: 'device-loader.js',
    // use library + libraryTarget to expose module globally
    library: 'DeviceLoader',
    libraryTarget: 'var'
  }
};

module.exports = webConfig;
