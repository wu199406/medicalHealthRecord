/**
 * Created by wu199406 on 2017/5/8.
 */
let mongoose = require("mongoose");

const roleModel = mongoose.model("role");

let BaseService = require("../service/BaseService");

class RoleService extends BaseService
{
    constructor()
    {
        super(roleModel);
    }

    

}

module.exports = RoleService;
