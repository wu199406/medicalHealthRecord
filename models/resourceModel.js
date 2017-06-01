/**
 * Created by wu199406 on 2017/5/1.
 */
/**
 * 资源的数据库模式创建和声明
 */

let mongoose = require("mongoose");//引用mongoose模块
let Schema = mongoose.Schema;

let resourceSchema = new Schema({
    id:{type:Schema.Types.ObjectId,default:mongoose.Types.ObjectId,required:true,unique:true},
    pid:{type:Schema.Types.ObjectId,default:null},//父资源的id主键
    name:{type:String,default:null},//资源名称
    url:{type:String,default:null},//资源路径
    type:{type:String,default:null},//资源类型
    sort:{type:Number,default:0},//排序次序
    icon:{type:String,default:null},//资源图标
    status:{type:String,default:null},//资源的状态
    note:{type:String,default:null},//资源说明
    createTime:{type: Date,default:Date.now},//创建时间
});

//添加静态方法

let resourceModel = mongoose.model("resource",resourceSchema);//声明集合

module.exports = resourceModel;