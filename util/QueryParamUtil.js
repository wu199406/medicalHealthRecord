/**
 * 主要用于处理请求参数
 * Created by wu199406 on 2017/5/26.
 */

let Util = require("../util/Util");

/**
 * 与请求参数相关的操作的工具类
 */
class QueryParamUtil
{
    /**
     * 将Expresss的请求参数抽出出来并返回
     * @param req   {Express.Request}   请求参数对象
     * @return {{}} 返回请求参数对象
     */
    static getQueryParams(req)
    {
        let getParams = req.query;
        let postParams = req.body;

        let query = {};

        Reflect.ownKeys(getParams).forEach(function (value, index, array) {
            Reflect.set(query, value, getParams[value]);
        });
        Reflect.ownKeys(postParams).forEach(function (value, index, array) {
            Reflect.set(query, value, postParams[value]);
        });

        return query;
    }

    /**
     * 将expresss的请求参数抽出出来并返回,可以设置是否返回值为空的请求参数
     * @param req   {Express.Request}   请求参数对象
     * @param flat  {boolean}   true,会返回空的属性(包括null和空字符串);false,不会返回空的属性。默认为true。
     * @return {{}}
     */
    static getQueryParamsMayHasEmpty(req,flat=true)
    {
        let query = QueryParamUtil.getQueryParams(req);

        if(flat == false)
        {
            Util.getNotNUllParams(query);
        }
        return query;
    }

    /**
     * 根据属性名数组将expresss的请求参数抽出出来并返回,可以设置是否返回值为空的请求参数
     * @param req   {Express.Request}   请求参数对象
     * @param fields    {Array} 属性名数组
     * @param flat  {boolean}   true,会返回空的属性(包括null和空字符串);false,不会返回空的属性。默认为true。
     * @return {{}} 返回相应的请求参数对象
     */
    static getQueryParamsOfFields(req,fields,flat=true)
    {
        if(!fields && !Array.isArray(fields))
        {
            throw new Error("第二个参数fields必须数组对象");
        }

        let query = QueryParamUtil.getQueryParams(req);

        Reflect.ownKeys(query).forEach(function (value, index, array) {
            if(!fields.includes(value))
            {
                Reflect.deleteProperty(query, value);
            }
        });

        if(flat == false)
        {
            Util.getNotNUllParams(query);
        }

        return query;
    }

    /**
     * query中不含有fields属性数组中的属性,而pageQuery中只含有fields属性数组中的属性
     *
     * @param req   {Express.Request}   请求参数对象
     * @param fields    {Array} 属性名数组
     * @param flat  {boolean}   true,会返回空的属性(包括null和空字符串);false,不会返回空的属性。默认为true。
     * @return {{'query': {}, 'pageQuery': {}}} query中不含有fields属性数组中的属性,而pageQuery中只含有fields属性数组中的属性
     */
    static getQueryParamsPartFields(req,fields,flat=true)
    {
        let newObj = {};
        let fieldsObj = {};

        if(!fields && !Array.isArray(fields))
        {
            throw new Error("第二个参数fields必须数组对象");
        }

        let query = QueryParamUtil.getQueryParams(req);

        Reflect.ownKeys(query).forEach(function (value, index, array) {
                if (fields.includes(value)) {
                    Reflect.set(fieldsObj, value, query[value]);
                }
                else {
                    Reflect.set(newObj, value, query[value]);
                }
        });

        if(flat == false)
        {
            Util.getNotNUllParams(newObj);
            Util.getNotNUllParams(fieldsObj);
        }

        return {'query':newObj,'pageQuery':fieldsObj};
    }
}

module.exports = QueryParamUtil;