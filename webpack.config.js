module.exports = env => {
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

  return {
    mode,
    entry: `${__dirname}/src/index.js`,
    devtool,
    output: {
      path: `${__dirname}/lib`,
      filename: outputFile,
      library: 'UniversalTilt',
      libraryTarget: 'umd',
      umdNamedDefine: true,
      globalObject:
        'typeof window !== "object" ? global.window = global : window'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    }
  };
};
