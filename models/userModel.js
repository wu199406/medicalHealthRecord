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
    roles:[{type:Schema.Types.ObjectId,ref:"role"}]//权限角色数组
});

//添加静态方法

/**
 * 添加一个用户,会先判断是否存在同名用户
 *
 * @param user {user} 要添加的用户对象,这必须是一个js纯净对象
 * @param callback  回调函数,第一个参数必须是err
 */
userSchema.statics.addUser = function(user,callback){
    //判断是否存在同名的用户对象
    this.find({userName: user.userName},(err,docs)=>{
        if(err)
        {
            callback(err);
        }else if(docs.length == 0){//如果用户不存在,就尝试创建一个新用户
            this.create(user,function (err,...doc) {
                if(err || doc.length <= 0){
                    //添加用户失败
                    callback(err);
                }else{
                    callback();
                }
            });
        }else{ //如果用户存在
            callback( new Error("添加新用户失败,用户名称已经存在"));
        }
    });
};

/**
 * userModel的find方法的promise化,通过find方法查询是否存在匹配条件对象user的文档
 *
 * @param user {user}
 *
 * @returns {Promise}
 */
userSchema.statics.findPromise = function(user){
    return new Promise((resolve, reject)=>{
        this.find(user,(err,docs)=>{
            if(err)
            {
                reject(err);
            }
            else if (docs.length > 0)
            {
                resolve({state:false,message:"已经存在同名用户"});
            }
            else
            {
                resolve({state:true});
            }
        });
    });
};

/**
 * userModel的create方法的promise化,创建新的文档user
 *
 * @param user
 * @returns {Promise}
 */
userSchema.statics.createPromise = function (user) {
    return new Promise((resolve, reject)=>{
        this.create(user,(err,...doc)=>{
            if(err || doc.length <= 0)
            {
                reject(err==null?new error("创建失败"):err);
            }
            else
            {
                resolve({state:true,message:"成功"});
            }
        });
    });
};

let userModel = mongoose.model("user",userSchema);//声明集合

module.exports = userModel;





