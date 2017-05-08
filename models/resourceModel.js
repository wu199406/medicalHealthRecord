/**
 * Created by wu199406 on 2017/5/1.
 */
/**
 * 资源的数据库模式创建和声明
 */

let mongoose = require("mongoose");//引用mongoose模块
let Schema = mongoose.Schema;

let resourceSchema = new Schema({
    name:String,
    createTime:{type: Date,default:Date.now()},//创建时间
    url:String
});

//添加静态方法

let resourceModel = mongoose.model("resource",resourceSchema);//声明集合

module.exports = resourceModel;