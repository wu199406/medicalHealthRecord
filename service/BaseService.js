/**
 * 通用服务层
 * Created by wu199406 on 2017/5/13.
 */

let modelUtil = require("../util/ModelUtil");
let util = require("../util/Util");

class BaseService
{
    /**
     *
     * @param model{mongoose.model} mongoose的model
     */
    constructor(model)
    {
        this.model = model;
    }

    /**
     *
     * @param entity {mongoose.model.entity}    要保存的对象
     */
    async addOfBase(entity)
    {
        let result = await this.model.create(entity);

        return result;
    }

    /**
     * 根据主键进行修改
     * @param entity
     * @returns {Promise.<void>}
     */
    async editByIdOfBase(entity)
    {
        if( !entity.id )
        {
            throw new Error("更新时id主键不能为空");
        }

        util.setEmptyStrToNullOfObj(entity);//将更新对象中的空字符串设置为null

        let result = await this.model.update({id:entity.id},{$set:entity});

        return result;
    }

    /**
     * 删除一个或者多个文档
     * @param id {String|Array} 文档的id,可以是要删除的记录的id数组
     * @return {Promise.<void>}
     */
    async deleteByIdOfBase(id)
    {
        if( util.isNotEmptyString(id) )
        {
            let result = await this.model.remove({id:id});
            return result;
        }
        else if( Array.isArray(id) )
        {
            await this.model.deleteMany().where("id").in(id).exec();
        }
    }

    /**
     * 进行分页查询
     * @param page  页码
     * @param row   分页大小
     * @param query 查询条件对象
     * @param {String}  [sortField]   排序字段，默认是id
     * @return {Promise.<{list, size}>}
     */
    async findByPageOfBase(page,row,query,sortField="id")
    {
        page = Number(page);
        row = Number(row);

        query = modelUtil.getPropertyNotNullObject(query);
        let [rows,total] = await Promise.all([
            this.model.find().where(query).sort({[sortField]:1}).limit(row).skip((page-1)*row).exec(),
            this.model.count(query)
        ]);
        return {rows ,total};
    }

    /**
     * 查询所有值
     * @param query 查询条件对象
     * @param {String}  [sortField]   排序字段，默认是id
     * @return {Promise.<list>}
     */
    async findAllOfBase(query,sortField="id")
    {
        query = modelUtil.getPropertyNotNullObject(query);
        let rows = await  this.model.find().where(query).sort({[sortField]:1}).exec();
        return rows;
    }

    /**
     * 根据id获取相应的文档
     * @param id    {String}    id主键
     * @return {Promise.<*>}
     */
    async findByIdOfBase(id) {
        if (util.isNotEmptyString(id))
        {
            return await this.model.findOne({"id": id}).exec();
        }
        else
        {
            throw new Error("id主键不能为空");
        }
    }
}

module.exports = BaseService;