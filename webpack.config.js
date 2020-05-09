module.exports = {
  devtool: 'inline-source-map',
  watch: false,
  mode: "development",
  entry: {
    'js/chat': `${__dirname}/src/js/chat.ts`,
    'js/shogi': `${__dirname}/src/js/shogi.ts`
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      }
    ]
  },
  output: {
    path: `${__dirname}/public`,
    filename: "[name].js"
  },
  optimization: {
    splitChunks: {
      name: "js/chunks",
      chunks: "initial"
    }
  },
  resolve: {
    extensions: [
      ".js", ".ts"
    ]
  }
};
