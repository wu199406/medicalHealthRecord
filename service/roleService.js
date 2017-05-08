/**
 * Created by wu199406 on 2017/5/8.
 */
let mongoose = require("mongoose");

const roleModel = mongoose.model("role");

class roleService{
    constructor(){}

    static async addRole(role,callback)
    {
        try
        {
           let result = await roleModel.create(role);

            console.log("添加新角色成功");
            console.log(result);
        }
        catch (err)
        {
            console.log("添加新角色失败");
            return err;
        }
    }
}

module.exports = roleService;
