/**
 * Created by wu199406 on 2016/11/24.
 */
//获取mongoose模块以及连接对应url的mongodb数据库
let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mhr");

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (err,callback) {
    if (err)
    {
        console.error("数据库连接失败",err);
    }
    else
    {
        console.log("数据库连接成功");
    }
});

//存储所有模型的对象
let model = {};

//获取用户模型
/*model.userModel = require("../models/user.service.model");*/


module.exports = model;