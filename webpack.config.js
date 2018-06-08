const path = require('path');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
  entry: './web-src/load-index-async.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new SWPrecacheWebpackPlugin({
      staticFileGlobs: ['./public/index.html', './public/index.css'],
      mergeStaticsConfig: true,
    }),
  ]
};
