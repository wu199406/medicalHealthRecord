/**
 * 用于配置路由入口
 * 所有的路由模块都该处导入,通过在app.js文件中引用该模块并调用路由配置方法routConfigFun配置路由
 * Created by wu199406 on 2017/6/26.
 */

//引入路由模块
let index = require('../routes/indexRout');
let users = require('../routes/usersRout');
let role = require('../routes/roleRout');
let resource = require("../routes/resourceRout");

/**
 * 将路由配置到app
 * @param app
 */
let routConfigFun = function(app){
    app.use('/', index);
    app.use('/user', users);
    app.use('/role', role);
    app.use("/resource",resource);
};

module.exports = routConfigFun;