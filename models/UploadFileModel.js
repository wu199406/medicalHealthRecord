/**
 * Created by wu199406 on 2018/1/23.
 */
let mongoose = require("mongoose");//引用mongoose模块

let Schema = mongoose.Schema;

let uploadFileSchema = new Schema({
    id:{type:Schema.Types.ObjectId,default:mongoose.Types.ObjectId,required:true,unique:true},
    fileName:{type:String,default:null},
    filePath:{type:String,default:null},
    fileSize:{type:Number,default:null},
    mimeType:{type:String,default:null},
    createTime:{type: Date,default:Date.now()},//创建时间
});

let uploadFileModel = mongoose.model('uploadFile',uploadFileSchema);//声明集合

module.exports = uploadFileModel;