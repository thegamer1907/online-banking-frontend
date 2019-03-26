module.exports = {
  runtimeCompiler: true,
  publicPath: undefined,
  outputDir: undefined,
  assetsDir: "/assets",
  productionSourceMap: undefined,
  parallel: undefined,
  css: {
    modules: true,
    sourceMap: true
  },
  devServer: {
    host: "0.0.0.0",
    hot: true,
    disableHostCheck: true
  }
};
