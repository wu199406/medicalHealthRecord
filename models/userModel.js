/**
 *   用户的数据库模式创建和声明
 *
 */
var mongoose = require("mongoose");    //引用mongoose模块

var Schema = mongoose.Schema;

let userSchema = new Schema({
    userName:String,//登录名称
    passWord:String,//登录密码
    name:String,//用户名称
    createTime:{type: Date,default:Date.now()},//创建时间
    roles:[{type:String}]//权限角色数组
});

//添加静态方法

/**
 * 添加一个用户,会先判断是否存在同名用户
 *
 * @param user  要添加的用户对象,这必须是一个js纯净对象
 * @param callback  回调函数,第一个参数必须是err
 */
userSchema.statics.addUser = function(user,callback){
    //判断是否存在同名的用户对象
    this.find({userName: user.userName},function(err,docs){
        if(err)
        {
            callback(err);
        }
        //如果用户不存在,就尝试创建一个新用户
        else if(docs.length == 0)
        {
            this.create(user,function (err,...doc) {
                if(err || doc.length <= 0){
                    //添加用户失败
                    callback(err);
                }else{
                    callback();
                }
            });
        }
        //如果用户存在
        else
        {
            callback( new Error("添加新用户失败,用户名称已经存在"));
        }
    });
};


let userModel = mongoose.model("userModel",userSchema);//声明集合

module.exports = userModel;





