/**
 * Created by wu199406 on 2017/5/8.
 */
let mongoose = require("mongoose");

const roleModel = mongoose.model("role");

let Util = require('../Util/Util');

let BaseService = require("../service/BaseService");

class RoleService extends BaseService
{
    constructor()
    {
        super(roleModel);
    }

    /**
     * 设置角色所拥有的资源
     * @param {String} id
     * @param {Array} resourceIds
     * @return {Promise.<void>}
     */
    async roleGrant(id,resourceIds)
    {
        if(Util.isNotEmptyString(id))
        {
            if(Array.isArray(resourceIds))
            {
                await this.model.updateOne({id:id},{resources:resourceIds});
            }
        }
        else
        {
            throw new Error('id不能为空');
        }
    }
}

module.exports = RoleService;
