/**
 * 通用的提供tree的服务
 * Created by wu199406 on 2017/5/27.
 */

let Util = require("../util/Util");
let MongooseModelUtil = require('../Util/MongooseModelUtil');
let Tree = require("../vo/Tree");

let BaseService = require('../service/BaseService');

class BaseTreeService extends BaseService
{
    /**
     * 通用的提供tree的服务
     * @param model
     * @extends BaseService
     */
    constructor(model)
    {
        super(model);
    }

    /**
     * 覆盖BaseService的deleteById方法
     * 当删除一个树节点时，会递归删除其子孙节点
     * @param {String|Array} id 文档的id或者id数组
     * @return {Promise.<void>}
     */
    async deleteByIdOfBase(id)
    {
        await super.deleteByIdOfBase(id);//调用父类方法删除文档

        if(Array.isArray(id))
        {
            for(let element of id)
            {
                let childrens = await this.model.find({pid:element}).select('id').exec();
                childrens = MongooseModelUtil.toObjectByArray(childrens);//将数组中的document转换为纯净的js对象
                let newchildrens = childrens.map(function (value) {
                    if(value && value.id)
                    {
                        return value.id;
                    }
                });
                await this.deleteByIdOfBase(newchildrens);//递归删除子节点
            }
        }
    }

    /**
     * 以树的方式历遍集合，并返回树型的数据
     * @param {Object} pid  父节点的id
     * @param {Array}   [excludeId]     排除的节点的id主键数组，可选的，默认为空数组
     * @param {String}  [sortField]   排序字段，默认是id
     * @return {Promise.<Array>}
     */
    async findOfTreeOfBase(pid,excludeId = [],sortField="id")
    {
        let that = this;

        let childrenTrees = new Array();//创建返回的节点数组

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

                tree.children = await that.findOfTreeOfBase(tree.id,excludeId,sortField);//递归

                childrenTrees.push(tree);
            }
        }
        return childrenTrees;
    }

    /**
     * 用于树表格的获取分页数据和节点的孩子节点数组
     * @param page
     * @param row
     * @param query 如何该参数有非空的pid，表示获取指定节点的孩子节点数组；否则表示获取顶层节点的分页数据
     * @param {String}  [sortField]   排序字段，默认是id
     * @return {Promise.<*>}
     */
    async findByPageOfTreeOfBase(page,row,query,sortField="id")
    {
        page = Number(page);
        row = Number(row);

        let rows = null , total = null;
        if(Util.isNotEmptyString(query.pid))
        {
            [rows,total] = await Promise.all([
                this.model.find().where(query).sort({[sortField]:1}).limit(row).skip((page-1)*row).exec(),
                this.model.count(query).exec()
            ]);

            rows = await this.setTreegridNodes(rows);
            return rows;
        }
        else
        {
            [rows,total] = await Promise.all([
                this.model.find().where(query).where("pid",null).sort({[sortField]:1}).limit(row).skip((page-1)*row).exec(),
                this.model.count(query).where("pid",null).exec()
            ]);

            rows = await this.setTreegridNodes(rows);
            return {rows,total};
        }
    }

    /**
     * 判断list中的节点是有有子节点，有就为节点添加值为"closed"的属性state；没有添加值为"open"的属性state。
     * @private 私有方法
     * @param list
     * @return {Promise.<Array|*>}  返回转换修改后的节点数组
     */
    async setTreegridNodes(list)
    {
        let results = new Array();
        let promises = new Array();

        list = MongooseModelUtil.toObjectByArray(list);//将数组中的document转换为纯净的js对象

        for(let node of list)
        {
            let promise = this.model.count({pid:node.id});
            promises.push(promise);
        }

        results = await Promise.all(promises);

        for(let i=0;i<results.length;i++)
        {
            if( results[i] && results[i] > 0)
            {
                list[i].state = "closed";
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

