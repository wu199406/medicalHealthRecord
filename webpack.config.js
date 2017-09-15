var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry:{
        hello:path.resolve('./client/src/main.js')
    },
    output: {
        path: path.resolve(__dirname, './client/dist'),//Webpack结果存储
        publicPath: '/dist/',//懵懂，懵逼，//然而“publicPath”项则被许多Webpack的插件用于在生产模式和开发模式下下更新内嵌到css、html，img文件里的url值
        filename: 'build.js'
    },
    module: {
        rules: [
            {test: /\.vue$/,use: 'vue-loader'  },
            { test: /\.js$/,use: 'babel-loader',include: /client/},
            {test: /\.(png|jpg|gif|svg)$/, use: {loader: "file-loader",options:{name: '[name].[ext]?[hash]' }} },
            {test: /\.css$/, use: [{ loader: 'style-loader'}, {loader: 'css-loader',options: {modules: false}}], include: /client/},
           /* { test: /\.scss$/, loader: "style-loader!css-loader!sass-loader!"}*/
        ]
    }/*,
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {//webpack-dev-server配置
        historyApiFallback: true,//不跳转
        noInfo: true,
        inline: true//实时刷新
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'*/
};

/*if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}*/

