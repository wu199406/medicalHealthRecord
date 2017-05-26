/**
 * Created by wu199406 on 2017/5/22.
 */
let express = require('express');
let router = express.Router();

let resourceServiceClass = require("../service/resourceService");//获取服务类
let resourceService = new resourceServiceClass();//创建服务实例

router.all("/selectPage",function(req, res, next){
    //获取请求的内容对象
    let body = req.body;

    let result = resourceService.findByPage(1,20,{});
    result.then(result=>{res.send(result);res.end();})
        .catch(err=>{res.send(err);res.end();})
});

router.all("/add",function(req, res, next){
    //获取请求的内容对象
    let query = req.query;

    let result = resourceService.addOfBase({"name":query.name,"url":query.url});
    result.then(result=>{res.send(result);res.end();})
        .catch(err=>{res.send(err);res.end();})
});

router.all("/edit",function(req, res, next){
    //获取请求的内容对象
    let query = req.query;

    let result = resourceService.editById({"_id":query._id,"name":query.name,"url":query.url});
    result.then(result=>{res.send(result);res.end();})
        .catch(err=>{res.send(err);res.end();})
});

router.all("/delete",function(req, res, next){
    //获取请求的内容对象
    let query = req.query;

    let result = resourceService.deleteById(query._id);
    result.then(result=>{res.send(result);res.end();})
        .catch(err=>{res.send(err);res.end();})
});

module.exports = router;
