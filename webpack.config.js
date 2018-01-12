let path = require('path');
let webpack = require('webpack');
let htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:{
        main:path.resolve('./client/src/main.js')
    },
    output: {
        path: path.resolve(__dirname, './public'),//Webpack结果存储
        //publicPath: '/public/',// 表示资源的发布地址，当配置过该属性后，打包文件中所有通过相对路径引用的资源都会被配置的路径所替换
        filename: 'index.js'
    },
    module: {
        rules: [
            {test: /\.vue$/,use: 'vue-loader',include: /client/},
            { test: /\.js$/,use: 'babel-loader',include: /client/},
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                        loader: "file-loader",
                        options:{
                                name: '[path][name].[ext]?[hash]',
                                outputPath: 'images/'
                        }
                } ,
                include: /client/
            },
            {test: /\.css$/, use: [{ loader: 'style-loader'}, {loader: 'css-loader',options: {modules: false}}], include: /client/},
           /* { test: /\.scss$/, loader: "style-loader!css-loader!sass-loader!"}*/
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'//使用vue的独立构建
        }
    }
    /**
     * 设置插件
     */
    /*plugins: [
        new htmlWebpackPlugin({
            filename:'index.ejs',
            template:path.resolve('./client/index.html'),
            inject:'body'//引入的script标签在body的最下面
        }),
    ]*/

    /*,
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

