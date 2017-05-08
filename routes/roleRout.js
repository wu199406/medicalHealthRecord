/**
 * Created by wu199406 on 2017/5/2.
 */
let express = require('express');
let router = express.Router();

let roleService = require("../service/roleService");

router.get("/",function(req, res, next){
    res.send('角色');
});

router.get("/addRole",function(req, res, next){
    //获取请求的内容对象
    let body = req.body;

    let result = roleService.addRole({"name":body.name});
    result.then(result=>{res.send(result);res.end();})
        .catch(err=>{res.send(result);res.end();})
});

module.exports = router;