/**
 * Created by wu199406 on 2017/5/2.
 */
let express = require('express');
let router = express.Router();

//导入工具类
let QueryParamUtil = require("../util/QueryParamUtil");
let ResponseUtil = require("../util/ResponseUtil");
let PageUtil = require("../vo/PageUtil");

let RoleService = require("../service/roleService");//获取服务类
let roleService = new RoleService();//创建服务实例

router.get("/index",function(req, res, next){
    res.render('base/role', {});
});
router.get("/getAdd",function(req, res, next){
    res.render('base/roleAdd', {});
});
router.get("/getEdit",async function(req, res, next){
    try
    {
        let queryParam = QueryParamUtil.getQueryParamsOfFields(req,["id"]);

        let result = await roleService.findById(queryParam.id);

        res.render('base/roleEdit', {entity:result.toObject()});
    }
    catch(e)
    {
        console.log(e);
        res.send(JSON.stringify(e));
        res.end();
    }
});

/*获取角色授权页面*/
router.get("/getRoleGrant",async function(req, res, next){
    try
    {
        let queryParam = QueryParamUtil.getQueryParamsOfFields(req,["id"]);

        let result = await roleService.findById(queryParam.id);
        res.render('base/roleGrant', {id:result.get('id'),grant:result.toObject().resources});
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
        let result = await roleService.findByPage(pageQuery.page,pageQuery.rows,query,'sort');

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

        let result = await roleService.addOfBase(queryParam);

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

        let result = await roleService.editById(queryParam);

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

        let result = roleService.deleteById(JSON.parse(queryParam.idArray));

        ResponseUtil.returnResponseSuccess(res,"删除成功");
    }
    catch(e)
    {
        console.log(e);
        ResponseUtil.returnResponseErr(res,"删除失败",e);
    }
});

router.post("/grant",async function(req, res, next){
    try
    {
        //获取请求的内容对象
        let queryParam = await QueryParamUtil.getQueryParamsOfFields(req,['id','nodeIds'])

        await roleService.roleGrant(queryParam.id,JSON.parse(queryParam.nodeIds));

        ResponseUtil.returnResponseSuccess(res,"授权成功");
    }
    catch(e)
    {
        console.log(e);
        ResponseUtil.returnResponseErr(res,"授权失败",e);
    }
});

module.exports = router;