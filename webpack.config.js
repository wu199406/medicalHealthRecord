/**
 * webpack的配置文件
 * Created by wu199406 on 2017/7/1.
 */
let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');
//let ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    /**
     * 设置入口
     */
    entry:{
        hello:[path.resolve('./src/hello.js'),path.resolve('./src/a.js')]/*入口文件的路径*/
    },
    /**
     * 设置出口
     */
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    /**
     * 设置加载器和使用加载器的使用规则
     */
    module: {
        rules: [
            {test: /\.(js|jsx)$/, use: 'babel-loader', include: /src/},
            /*
            * 当css-loader的modules设置为false时,不会重写类名
            * { test: /\.css$/, loader:  ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),include: /src/ }--实现类文件抽取
            */
            {test: /\.css$/, use: [{ loader: 'style-loader'}, {loader: 'css-loader',options: {modules: false}},], include: /src/},
        ]
    },
    /**
     * 设置插件
     */
    plugins: [
        new htmlWebpackPlugin({
            filename:'index.html',
            template:path.resolve('./src/hello.html'),
            inject:'head'
        }),
        //new ExtractTextPlugin('styles.css')
    ]
};
