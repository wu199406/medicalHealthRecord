/**
 * Created by wu199406 on 2017/5/13.
 */

let mongoose = require("mongoose");
let resourceModel = mongoose.model("resource");

let BaseTreeService = require("../service/BaseTreeService");

let Util = require("../util/Util");
let Tree = require("../vo/Tree");

class resourceService extends BaseTreeService
{
    constructor()
    {
        super(resourceModel);
    }

    /**
     * 以树的方式历遍集合，并返回树型的数据
     * @param {Object} pid  父节点的id
     * @param {Array}   [excludeId]     排除的节点的id主键数组，可选的，默认为空数组
     * @param {String}  [sortField]   排序字段，默认是id
     * @return {Promise.<Array>}
     */
    async findOfTree(pid,excludeId = [],sortField="id")
    {
        let that = this;

        let childrenTrees = [];//创建返回的节点数组

        let list = null;

        if(Util.isNotEmptyString(pid))//如果父节点为非空字符串,就获取并历遍其子节点,并返回子节点数组
        {
            //list = await this.model.find({"pid":pid}).exec();//获取子节点数组
            list = await this.model.find().and([{"pid":pid},{ id: { $nin: excludeId} }]).sort({[sortField]:1}).exec();//获取子节点数组
        }
        else
        {
            //list = await this.model.$where('this.pid == null || this.pid == undefined').exec();//获取子节点数组
            list = await this.model.find().and([{"pid":null},{ id: { $nin: excludeId} }]).sort({[sortField]:1}).exec();
        }

        if( list && Array.isArray(list) )
        {
            for( let i = 0 ; i < list.length ; i++ )
            {
                let value = list[i].toObject();
                let tree = new Tree();
                tree.id = value.id.toString();
                tree.text = value.name;
                tree.iconCls = value.icon;
                tree.state = value.status;
                tree.checked = false;
                tree.attributes = {
                    url:value.url
                };

                tree.children = await that.findOfTree(tree.id,excludeId,sortField);//递归

                childrenTrees.push(tree);
            }
        }
        return childrenTrees;
    }
}

module.exports = resourceService;