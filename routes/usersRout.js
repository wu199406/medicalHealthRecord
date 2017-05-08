let express = require('express');
let router = express.Router();

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
    result.then(result=>{res.send(result);res.end();})
          .catch(err=>{res.send(result);res.end();});
});


module.exports = router;
