/**
 * Created by wu199406 on 2017/5/22.
 */
let express = require('express');
let router = express.Router();

let resourceService = new require("../service/resourceService");

router.get("/addResource",function(req, res, next){
    //获取请求的内容对象
    let body = req.body;

    let result = resourceService.addOfBase({"name":body.name});
    result.then(result=>{res.send(result);res.end();})
        .catch(err=>{res.send(result);res.end();})
});

router.get("/selectPage",function(req, res, next){
    //获取请求的内容对象
    let body = req.body;

    let result = resourceService.findByPage(body);
    result.then(result=>{res.send(result);res.end();})
        .catch(err=>{res.send(result);res.end();})
});

module.exports = router;
