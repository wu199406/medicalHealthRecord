/**
 * 通用服务层
 * Created by wu199406 on 2017/5/13.
 */

let modelUtile = require("../util/ModelUtil");
let util = require("../util/util");

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
    async editById(entity)
    {
        try
        {
            if( !entity.id )
            {
                return {flat:false,message:"更新时id主键不能为空"};
            }

            let updateObj = modelUtile.getPropertyNotNullObject(entity);

            let result = await this.model.update({id:entity.id},{$set:updateObj});

            return result;
        }
        catch (err)
        {
            return err;
        }
    }

    /**
     * 删除一个或者多个文档
     * @param id {String|Array} 文档的id
     * @return {Promise.<void>}
     */
    async deleteById(id)
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
     * @return {Promise.<{list, size}>}
     */
    async findByPage(page,row,query)
    {
        query = modelUtile.getPropertyNotNullObject(query);
        let [list,size] = await Promise.all([
            this.model.find().where(query).sort({id:1}).limit(row).skip((page-1)*row).exec(),
            this.model.count(query)
        ]);
        return {rows : list,total: size};
    }

    /**
     * 根据id获取相应的文档
     * @param id    {String}    id主键
     * @return {Promise.<*>}
     */
    async findById(id)
    {
        if( util.isNotEmptyString(id) )
        {
            return await this.model.findOne({"id":id}).exec();
        }
        return null;
    }
}

module.exports = BaseService;