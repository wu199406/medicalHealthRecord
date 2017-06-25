/**
 * Created by wu199406 on 2017/3/2.
 */
let mongoose = require("mongoose");

//导入
const userModel = mongoose.model("user");

let Util = require('../Util/Util');

let BaseService = require("../service/BaseService");

class userService extends BaseService
{
    /**
     * 构造函数
     */
    constructor()
    {
        super(userModel);
    }

    /**
     * 添加一个新用户,先判断用户名是否已经存在
     *
     * @param user
     * @return {Promise.<void>}
     */
    async addUser(user)
    {
        let list = await this.model.find({userName:user.userName});
        if(Array.isArray(list) && list.length > 0)
        {
            throw new Error("用户名已经存在");
        }

        await this.addOfBase(user);
    }


}

module.exports = userService;