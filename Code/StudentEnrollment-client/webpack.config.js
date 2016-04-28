var path = require('path');

module.exports = {
    entry: "./app-client.js",
    output: {
        path: path.join(__dirname, 'public/js'),
        filename: "bundle.js"
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    module: {
      // preLoaders: [
      //       // Javascript
      //       { test: /(\.jsx|\.js)$/, loader: 'eslint-loader', exclude: /node_modules/ }
      //   ],
      // { test: /\.css$/, loader: "style!css" },
        loaders: [

            {
              test:  /(\.jsx|\.js)$/,
              loader: "babel-loader",
              exclude: /(node_modules)/,
              query: { presets:[ 'es2015', 'react', 'stage-0' ]}
              // ,query: {presets: ['es2015', 'react'] }
            }

        ]
    },
    eslint: {
        failOnWarning: false,
        failOnError: true
    }
};
