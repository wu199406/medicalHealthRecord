let express = require('express');
let router = express.Router();
/*let mongoose = require("mongoose");

//导入
let userModel = mongoose.model("user");*/

let userService = require("../service/userService");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*添加一个新用户*/
router.post("/addUser",function(req, res, next){
    //获取请求的内容对象
    let body = req.body;

    let result = userService.addUserPromise({"userName":body.userName,"passWord":body.passWord});
    result.then(result=>{res.send(result);req.end();})
          .catch(err=>{res.send(result);req.end();})
});


module.exports = router;
