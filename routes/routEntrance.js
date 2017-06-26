/**
 * 用于配置路由入口
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
module.exports = function(app){
    app.use('/', index);
    app.use('/users', users);
    app.use('/role', role);
    app.use("/resource",resource);
};