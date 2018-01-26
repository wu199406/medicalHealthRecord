/**
 * Created by wu199406 on 2018/1/15.
 *
 * 创建并声明背景墙的数据类型
 */

let mongoose = require("mongoose");//引用mongoose模块
let Schema = mongoose.Schema;

let backgroundCaseSchema = new Schema({
    id:{type:Schema.Types.ObjectId,default:mongoose.Types.ObjectId,required:true,unique:true},
    name:{type:String,default:null},//资源名称
    customer:{type:String,default:null},//客户名称
    address:{type:String,default:null},//地址
    time:{type: Date,default:null},//项目的时间
    size:{type:String,default:null},//大小
    describe:{type:String,default:null},//描述
    firstFigure:{ id: {type:String,default:null}, name: {type:String,default:null} },//首图
    figures:[{ id: {type:String,default:null}, name: {type:String,default:null} }],//其他图片
    createTime:{type: Date,default:Date.now},//创建时间
});

let backgroundCaseModel = mongoose.model("backgroundCase",backgroundCaseSchema);//声明集合

module.exports = backgroundCaseModel;
