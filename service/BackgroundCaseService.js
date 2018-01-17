/**
 * Created by wu199406 on 2018/1/16.
 */

let mongoose = require("mongoose");
const backgroundCaseModel = mongoose.model("backgroundCase");

let Util = require('../Util/Util');

let BaseService = require("../service/BaseService");

/**
 * @class 背景墙信息类
 */
class BackgroundCaseService extends BaseService
{
    /**
     * 构造函数
     */
    constructor() {
        super(backgroundCaseModel);
    }
}

module.exports = BackgroundCaseService;