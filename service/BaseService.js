/**
 * Created by wu199406 on 2017/5/13.
 */
/*
* 通用服务层
*/

let modelUtile = require("../util/ModelUtil");
let util = require("../util/util");

class BaseService
{
    model=null;

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
        try
        {
            let result = await this.model.create(entity);

            console.log("添加成功");
            console.log(result);
        }
        catch (err)
        {
            console.log("添加失败");
            return err;
        }
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
            let updateObj = modelUtile.getPropertyNotNullObject(entity);

            let result = await this.model.update({id:entity.id},{$set:updateObj});

            console.log("修改成功");
            console.log(result);
        }
        catch (err)
        {
            console.log("修改失败");
            return err;
        }
    }

    /**
     * 删除一个文档
     * @param id    文档的id
     * @return {Promise.<void>}
     */
    async deleteById(id)
    {
        if( util.isNotEmptyString(ids) )
        {
            let result = await this.model.remove({id:id});
            console.log("删除成功");
            console.log(result);
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
        query = query.getPropertyNotNullObject(entity);
        let [list,size] = await Promise.all([
            this.model.find(query,{sort:[["id",1]],limit:row,skip:(page * row - 1)}),
            this.model.find(query)
        ])

        return {list : list,size: size};
    }
}

module.exports = BaseService;