const env = require('yargs').argv.env;

const libraryName = 'universal-tilt';

let outputFile, mode, devtool;

if (env === 'build') {
  mode = 'production';
  outputFile = `${libraryName}.min.js`;
  devtool = false;
} else {
  mode = 'development';
  outputFile = `${libraryName}.js`;
  devtool = 'source-map';
}

const config = {
  mode,
  entry: `${__dirname}/src/${libraryName}.js`,
  devtool,
  output: {
    path: `${__dirname}/lib`,
    filename: outputFile,
    library: 'UniversalTilt',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'global'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};

module.exports = config;
