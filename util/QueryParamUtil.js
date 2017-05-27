/**
 * Created by wu199406 on 2017/5/26.
 */

/**
 * 与请求参数相关的操作的工具类
 */
class QueryParamUtil
{
    /**
     * 将expresss的请求参数抽出出来并返回
     * @param req   {Express.Request}   请求参数对象
     * @return {{}} 返回请求参数对象
     */
    static getQueryParams(req)
    {
        let getParams = req.query;
        let postParams = req.body;

        let newObj = {};

        Reflect.ownKeys(getParams).forEach(function (value, index, array) {
            Reflect.set(newObj, value, getParams[value]);
        });
        Reflect.ownKeys(postParams).forEach(function (value, index, array) {
            Reflect.set(newObj, value, postParams[value]);
        });

        return newObj;
    }

    /**
     * 根据属性名数组将expresss的请求参数抽出出来并返回
     * @param req   {Express.Request}   请求参数对象
     * @param fields    {Array} 属性名数组
     * @return {{}} 返回相应的请求参数对象
     */
    static getQueryParamsOfFields(req,fields)
    {
        let getParams = req.query;
        let postParams = req.body;

        let newObj = {};

        Reflect.ownKeys(getParams).forEach(function (value, index, array) {
            if(fields.includes(value))
            {
                Reflect.set(newObj, value, getParams[value]);
            }
        });
        Reflect.ownKeys(postParams).forEach(function (value, index, array) {
            if(fields.includes(value))
            {
                Reflect.set(newObj, value, postParams[value]);
            }
        });

        return newObj;
    }
}

module.exports = QueryParamUtil;