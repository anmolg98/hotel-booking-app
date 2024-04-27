const path = require('path');

module.exports = {
    module: {
        rules: [
          {
            test: /\.js|\.jsx$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          }
        ]
      },
  entry: './src/index.js', // Replace 'index.js' with your entry file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Output bundle file name
  },
  resolve: {
    fallback: {
      // Add fallback options here
      "zlib": require.resolve("browserify-zlib"),
      "querystring": require.resolve("querystring-es3"),
      "path": require.resolve("path-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "util": require.resolve("util/"),
      "url": require.resolve("url/")
    }
  },
  // Other webpack configuration options can be added here
};
