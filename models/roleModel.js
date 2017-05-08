/**
 * Created by wu199406 on 2017/5/1.
 */
/**
 * 角色的数据库模式创建和声明
 */

let mongoose = require("mongoose");//引用mongoose模块

let Schema = mongoose.Schema;

let roleSchema = new Schema({
    name:String,
    createTime:{type: Date,default:Date.now()},//创建时间
    resources:[{type:Schema.Types.ObjectId,ref:"resource"}]
});

//添加静态方法

let roleModel = mongoose.model("role",roleSchema);//声明集合

module.exports = roleModel;