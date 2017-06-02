/**
 * Created by wu199406 on 2017/5/13.
 */

let mongoose = require("mongoose");
let resourceModel = mongoose.model("resource");

let BaseTreeService = require("../service/BaseTreeService");

class resourceService extends BaseTreeService
{
    constructor()
    {
        super(resourceModel);
    }

    
}

module.exports = resourceService;