let express = require('express');
let router = express.Router();
let mongoose = require("mongoose");

//导入
let userModel = mongoose.model("userModel");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*添加一个新用户*/
router.post("/addUser",function(req, res, next){
    //获取请求的内容对象
    let body = req.body;

    //创建新用户
    userModel.addUser({"userName":body.userName,"passWord":body.passWord},function (err) {
    if(err)
    {
        console.error("添加新用户失败",err);
        res.send("添加新用户失败");
    }
    else
    {
        res.send("添加新用户成功");
        res.end();
    }
    });
});


module.exports = router;
