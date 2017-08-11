/**
 *
 * @author wu
 * 通用的rout层
 *
 * Created by wu199406 on 2017/8/5.
 */
let QueryParamUtil = require("../util/QueryParamUtil");
let ResponseUtil = require("../util/ResponseUtil");
let PageUtil = require("../vo/PageUtil");

class BaseRoute
{
    constructor(service)
    {
        this.service = service;
    }

    get_index(req, res, next)
    {
        res.render('base/user', {});
    }

    get_getAdd(req, res, next)
    {
        res.render('base/userAdd', {});
    }

    async get_getEdit(req, res, next)
    {
        try
        {
            let queryParam = QueryParamUtil.getQueryParamsOfFields(req,["id"]);

            let result =  await this.service.findByIdOfBase(queryParam.id);

            res.render('base/userEdit', {entity:result.toObject()});
        }
        catch(e)
        {
            console.log(e);
            res.send(JSON.stringify(e));
            res.end();
        }
    }
}