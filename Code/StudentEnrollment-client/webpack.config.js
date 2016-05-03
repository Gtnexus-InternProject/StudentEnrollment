var path = require('path');
var webpack = require("webpack");

module.exports = {
    entry: [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client',
        "./app-client.js"
    ],
    output: {
        path: path.join(__dirname, 'public/js'),
         publicPath: '/',
        filename: "bundle.js"
    },
    // devServer: {
    //
    // },
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

            // {
            //     test: /(\.jsx|\.js)$/,
            //     loader: 'react-hot',
            //     exclude: /(node_modules)/
            //     // ,query: {presets: ['es2015', 'react'] }
            // }
            // ,
            {
                test: /(\.jsx|\.js)$/,
                loaders:  ['react-hot' ,
                  'babel-loader?presets[]=es2015,presets[]=stage-0,presets[]=react'],
                exclude: /(node_modules)/
                // ,
                // query: {
                //     presets: ['es2015', 'react', 'stage-0']
                // }
                // ,query: {presets: ['es2015', 'react'] }
            }

        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    eslint: {
        failOnWarning: false,
        failOnError: true
    }
};
