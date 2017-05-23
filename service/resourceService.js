/**
 * Created by wu199406 on 2017/5/13.
 */

let BaseService = require("../service/BaseService");
let mongoose = require("mongoose");
let resourceModel = mongoose.model("resource");


class resourceService extends BaseService
{
    constructor()
    {
        super(resourceModel);
    }
}

module.exports = resourceService;