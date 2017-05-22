/**
 * Created by wu199406 on 2017/5/13.
 */

let mongoose = require("mongoose");
let resourceModel = mongoose.model("resource");
let BaseService = require("./BaseService");

class resourceService extends BaseService
{
    constructor()
    {
        super(resourceModel);
    }
}

module.exports = resourceService;