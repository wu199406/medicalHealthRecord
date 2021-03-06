/**
 * Created by wu199406 on 2017/5/1.
 */
/**
 * 角色的数据库模式创建和声明
 */

let mongoose = require("mongoose");//引用mongoose模块

let Schema = mongoose.Schema;

let roleSchema = new Schema({
    id:{type:Schema.Types.ObjectId,default:mongoose.Types.ObjectId,required:true,unique:true},
    name:{type:String,default:null},
    sort:{type:Number,default:0},//排序次序
    status:{type:String,default:null},//状态
    note:{type:String,default:null},//资源说明
    createTime:{type: Date,default:Date.now()},//创建时间
    resources:[{type:Schema.Types.ObjectId,ref:"resource"}]//角色拥有的资源，即角色的权限
});

//添加静态方法

let roleModel = mongoose.model("role",roleSchema);//声明集合

module.exports = roleModel;