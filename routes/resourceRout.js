/**
 * Created by wu199406 on 2017/5/22.
 */
//导入Express路由
let express = require('express');
let router = express.Router();

//导入工具类
let QueryParamUtil = require("../util/QueryParamUtil");
let ResponseUtil = require("../util/ResponseUtil");

let resourceServiceClass = require("../service/resourceService");//获取服务类
let resourceService = new resourceServiceClass();//创建服务实例

router.get("/index",function(req, res, next){
    res.render('base/resource', {});
});

router.get("/getAdd",function(req, res, next){
    res.render('base/resourceAdd', {});
});
router.get("/getEdit",function(req, res, next){
    let queryParam = QueryParamUtil.getQueryParamsOfFields(req,["id"]);

    let result = resourceService.findById(queryParam.id);

     result.then(result=>{res.render('base/resourceEdit', {entity:result.toObject()});})
     .catch(err=>{res.send(JSON.stringify(err));res.end();})
});

router.all("/selectPage",function(req, res, next){
    //获取请求的内容对象
    let queryParam = QueryParamUtil.getQueryParams(req);
    let result = resourceService.findByPage(queryParam.page,queryParam.rows,{});

    result.then(result=>{res.send(result);res.end();})
        .catch(err=>{res.send(JSON.stringify(err));res.end();})
});

router.all("/insert",function(req, res, next){
    //获取请求的内容对象
    let queryParam = QueryParamUtil.getQueryParams(req);

    let result = resourceService.addOfBase(queryParam);

    result.then(result=>{ResponseUtil.returnResponseSuccess(res,"添加成功");})
        .catch(err=>{ResponseUtil.returnResponseErr(res,"添加失败",err);});
});

router.all("/update",function(req, res, next){
    //获取请求的内容对象
    let queryParam = QueryParamUtil.getQueryParams(req);

    let result = resourceService.editById(queryParam);

    result.then(result=>{ResponseUtil.returnResponseSuccess(res,"编辑成功");})
        .catch(err=>{ResponseUtil.returnResponseErr(res,"编辑失败",err);});
});

router.all("/delete",function(req, res, next){
    //获取请求的内容对象
    let queryParam = QueryParamUtil.getQueryParams(req);

    let result = resourceService.deleteById(JSON.parse(queryParam.idArray));

    result.then(result=>{ResponseUtil.returnResponseSuccess(res,"删除成功");})
        .catch(err=>{ResponseUtil.returnResponseErr(res,"删除失败",err);})
});

router.post("/getTree",function(req, res, next){
    //获取请求的内容对象
    let queryParam = QueryParamUtil.getQueryParams(req);

    let result = resourceService.findOfTree(null);

    result.then(result=>{res.send(result);res.end();})
        .catch(err=>{res.send(JSON.stringify(err));res.end();})
});

router.all("/selectPageOfTree",async function(req, res, next){
    //获取请求的内容对象
    let {query,pageQuery} = QueryParamUtil.getQueryParamsNotFields(req,["page","rows"]);

    try
    {
        let result = await resourceService.findByPageOfTree(pageQuery.page,pageQuery.rows,query);
        res.send(result);
    }
    catch (e)
    {
        console.log(e);
        res.send(JSON.stringify(e));
    }
    res.end();
});

module.exports = router;
