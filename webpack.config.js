const path = require('path');

module.exports = {
  entry: './js/load-index-async.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname)
  },
  mode: "development" // Switch to "production" when ready
};
