/**
 * Created by wu199406 on 2017/5/22.
 */
let resourceServiceClass = require("../service/resourceService");

let express = require('express');
let router = express.Router();

let resourceService = new resourceServiceClass();

router.all("/addResource",function(req, res, next){
    //获取请求的内容对象
    let query = req.query;

    let result = resourceService.addOfBase({"name":query.name,"url":query.url});
    result.then(result=>{res.send(result);res.end();})
        .catch(err=>{res.send(err);res.end();})
});

router.all("/selectPage",function(req, res, next){
    //获取请求的内容对象
    let body = req.body;

    let result = resourceService.findByPage(1,20,{});
    result.then(result=>{res.send(result);res.end();})
        .catch(err=>{res.send(err);res.end();})
});

module.exports = router;
