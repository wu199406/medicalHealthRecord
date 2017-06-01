/**
 * 通用的提供tree的服务
 * Created by wu199406 on 2017/5/27.
 */

let ModelUtile = require("../util/ModelUtil");
let Util = require("../util/Util");
let MongooseModelUtil = require('../Util/MongooseModelUtil');
let Tree = require("../vo/Tree");

let BaseService = require('../service/BaseService');

class BaseTreeService extends BaseService
{
    constructor(model)
    {
        super(model);
    }

    /**
     * 以树的方式历遍集合
     * @param pid
     * @return {Promise.<Array>}
     */
    async findOfTree(pid)
    {
        let that = this;

        let childrenTrees = new Array();//创建返回的节点数组

        let list = null;

        if(Util.isNotEmptyString(pid))//如果父节点为非空字符串,就获取并历遍其子节点,并返回子节点数组
        {
            list = await this.model.find({"pid":pid}).exec();//获取子节点数组
        }
        else
        {
            list = await this.model.$where('this.pid == null || this.pid == undefined').exec();//获取子节点数组
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

                tree.children = await that.findOfTree(tree.id);//递归

                childrenTrees.push(tree);
            }
        }
        return childrenTrees;
    }

    async findByPageOfTree(page,row,query)
    {
        page = Number(page);
        row = Number(row);

        let rows = null , total = null;
        if(Util.isNotEmptyString(query.pid))
        {
            [rows,total] = await Promise.all([
                this.model.find().where(query).sort({id:1}).limit(row).skip((page-1)*row).exec(),
                this.model.count(query).exec()
            ]);

            rows = await this.setTreegridNodes(rows);
            return rows;
        }
        else
        {
            [rows,total] = await Promise.all([
                this.model.find().where(query).where("pid",null).sort({id:1}).limit(row).skip((page-1)*row).exec(),
                this.model.count(query).where("pid",null).exec()
            ]);

            rows = await this.setTreegridNodes(rows);
            return {rows,total};
        }
    }

    async setTreegridNodes(list)
    {
        let results = new Array();
        let promises = new Array();

        list = MongooseModelUtil.toObjectByArray(list);

        for(let node of list)
        {
            let promise = this.model.count({pid:node.id});
            promises.push(promise);
        }

        results = await Promise.all(promises);

        for(let i=0;i<results.length;i++)
        {
            if(results[i] > 0)
            {
                list[i].state = "closed";
                list[i].children = [];
            }
            else
            {
                list[i].state = "open";
            }
        }
        return list;
    }
}

module.exports = BaseTreeService;

