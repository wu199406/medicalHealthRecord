/**
 * Created by wu199406 on 2017/5/1.
 */
/**
 * 资源的数据库模式创建和声明
 */

let mongoose = require("mongoose");//引用mongoose模块
let Schema = mongoose.Schema;

let resourceSchema = new Schema({
    /*id:{type:mongoose.Schema.Types.ObjectId,default:mongoose.Types.ObjectId()},*/
    createTime:{type: Date,default:Date.now()},//创建时间
    name:String,
    url:String
});

//添加静态方法

let resourceModel = mongoose.model("resource",resourceSchema);//声明集合

module.exports = resourceModel;