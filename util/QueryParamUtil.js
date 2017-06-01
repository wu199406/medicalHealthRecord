/**
 * Created by wu199406 on 2017/5/26.
 */

let Util = require("../util/Util");

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
            if(Util.isNotEmptyString(getParams[value]))
            {
                Reflect.set(newObj, value, getParams[value]);
            }
        });
        Reflect.ownKeys(postParams).forEach(function (value, index, array) {
            if(Util.isNotEmptyString(postParams[value]))
            {
                Reflect.set(newObj, value, postParams[value]);
            }
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
        if(!fields && !Array.isArray(fields))
        {
            throw new Error("第二个参数fields必须数组对象");
        }

        let getParams = req.query;
        let postParams = req.body;

        let newObj = {};

        Reflect.ownKeys(getParams).forEach(function (value, index, array) {
            if(fields.includes(value) && Util.isNotEmptyString(getParams[value]))
            {
                Reflect.set(newObj, value, getParams[value]);
            }
        });
        Reflect.ownKeys(postParams).forEach(function (value, index, array) {
            if(fields.includes(value) && Util.isNotEmptyString(postParams[value]))
            {
                Reflect.set(newObj, value, postParams[value]);
            }
        });

        return newObj;
    }

    /**
     * query中不含有fields属性数组中的属性,而pageQuery中只含有fields属性数组中的属性
     *
     * @param req   {Express.Request}   请求参数对象
     * @param fields    {Array} 属性名数组
     * @return {{'query': {}, 'pageQuery': {}}} query中不含有fields属性数组中的属性,而pageQuery中只含有fields属性数组中的属性
     */
    static getQueryParamsNotFields(req,fields)
    {
        let getParams = req.query;
        let postParams = req.body;

        let newObj = {};
        let fieldsObj = {};

        Reflect.ownKeys(getParams).forEach(function (value, index, array) {
            if(Util.isNotEmptyString(getParams[value])) {
                if (fields.includes(value)) {
                    Reflect.set(fieldsObj, value, getParams[value]);
                }
                else {
                    Reflect.set(newObj, value, getParams[value]);
                }
            }
        });
        Reflect.ownKeys(postParams).forEach(function (value, index, array) {
            if(Util.isNotEmptyString(postParams[value])) {
                if (fields.includes(value)) {
                    Reflect.set(fieldsObj, value, postParams[value]);
                }
                else {
                    Reflect.set(newObj, value, postParams[value]);
                }
            }
        });

        return {'query':newObj,'pageQuery':fieldsObj};
    }
}

module.exports = QueryParamUtil;