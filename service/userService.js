/**
 * Created by wu199406 on 2017/3/2.
 */
let mongoose = require("mongoose");

//导入
const userModel = mongoose.model("user");

class userService{
    /**
     * 构造函数
     */
    constructor(){}

    /**
     * 添加一个用户,会先判断是否存在同名用户
     * @param user
     * @param callback
     */
    static addUser(user,callback)
    {
        userModel.addUser(user,callback);
    }

    /**
     * 通过async创建新用户
     * @param user
     */
    static async addUserPromise(user)
    {
        /*查询是否存在同名用户*/
        try {
            let findResult = await userModel.findPromise({"userName":user.userName});

            if(findResult.state == true)
            {
                let createResult = await userModel.createPromise(user);
                return createResult;
            }
            return findResult;
        }
        catch (err)
        {
            return err;
        }
    }
}

module.exports = userService;