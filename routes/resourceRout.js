/**
 * Created by wu199406 on 2017/5/22.
 */
//导入Express路由
let express = require('express');
let router = express.Router();

//导入工具类
let QueryParamUtil = require("../util/QueryParamUtil");
let ResponseUtil = require("../util/ResponseUtil");
let PageUtil = require("../vo/PageUtil");

let resourceServiceClass = require("../service/resourceService");//获取服务类
let resourceService = new resourceServiceClass();//创建服务实例

router.get("/index",function(req, res, next){
    res.render('base/resource', {});
});

router.get("/getAdd",function(req, res, next){
    res.render('base/resourceAdd', {});
});
router.get("/getEdit",async function(req, res, next){
    try
    {
        let queryParam = QueryParamUtil.getQueryParamsOfFields(req,["id"]);

        let result = await resourceService.findById(queryParam.id);

        res.render('base/resourceEdit', {entity:result.toObject()});
    }
    catch(e)
    {
        console.log(e);
        res.send(JSON.stringify(e));
        res.end();
    }
});

router.post("/selectPage",async function(req, res, next){
    try
    {
        //获取请求的内容对象
        let {query,pageQuery} = QueryParamUtil.getQueryParamsPartFields(req,["page","rows"],false);
        let result = await resourceService.findByPage(pageQuery.page,pageQuery.rows,query,'sort');

        res.send(result);
    }
    catch (e)
    {
        console.log(e);
        res.send(new PageUtil());
    }
    res.end();
});

router.post("/insert",async function(req, res, next){
    try
    {
        //获取请求的内容对象
        let queryParam = QueryParamUtil.getQueryParamsMayHasEmpty(req,false);

        let result = await resourceService.addOfBase(queryParam);

        ResponseUtil.returnResponseSuccess(res,"添加成功");
    }
    catch (e)
    {
        console.log(e);
        ResponseUtil.returnResponseErr(res,"添加失败",e);
    }
});

router.post("/update",async function(req, res, next){
    try
    {
        //获取请求的内容对象
        let queryParam = QueryParamUtil.getQueryParamsMayHasEmpty(req,true);

        let result = await resourceService.editById(queryParam);

        ResponseUtil.returnResponseSuccess(res,"编辑成功");
    }
    catch(e)
    {
        console.log(e);
        ResponseUtil.returnResponseErr(res,"编辑失败",e);
    }
});

router.post("/delete",async function(req, res, next){
    try {
        //获取请求的内容对象
        let queryParam = await QueryParamUtil.getQueryParamsMayHasEmpty(req, true);

        let result = resourceService.deleteById(JSON.parse(queryParam.idArray));

        ResponseUtil.returnResponseSuccess(res,"删除成功");
    }
    catch(e)
    {
        console.log(e);
        ResponseUtil.returnResponseErr(res,"删除失败",e);
    }
});

router.post("/getTree",async function(req, res, next){
    try {
        //获取请求的内容对象
        let query = QueryParamUtil.getQueryParamsMayHasEmpty(req, true);

        let result = await resourceService.findOfTree(query,[query.id],"sort");

        res.send(result);
    }
    catch (e)
    {
        console.log(e);
        res.send(new Array());
    }
    res.end();
});

router.post("/selectPageOfTree",async function(req, res, next){
    try
    {
        //获取请求的内容对象
        let {query,pageQuery} = QueryParamUtil.getQueryParamsPartFields(req,["page","rows"],false);

        let result = await resourceService.findByPageOfTree(pageQuery.page,pageQuery.rows,query,"sort");
        res.send(result);
    }
    catch (e)
    {
        console.log(e);
        res.send(new PageUtil());
    }
    res.end();
});

module.exports = router;
