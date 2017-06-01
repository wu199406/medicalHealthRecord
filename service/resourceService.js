/**
 * Created by wu199406 on 2017/5/13.
 */

let BaseTreeService = require("../service/BaseTreeService");
let mongoose = require("mongoose");
let resourceModel = mongoose.model("resource");


class resourceService extends BaseTreeService
{
    constructor()
    {
        super(resourceModel);
    }
}

module.exports = resourceService;