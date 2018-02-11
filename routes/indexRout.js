const express = require('express');
const router = express.Router();

let ResponseUtil = require("../util/ResponseUtil");
let SecurityManage = require('../component/permissions/SecurityManage');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('client/index', { title: '首页' });
});

router.get('/index', function(req, res, next) {
    res.render('index', { title: '后台管理系统首页' });
});

router.get('/unau',function (req, res, next) {
    res.render('unau', {});
});

router.get('/login',function(req, res, next){
    res.render('login', {});
});

router.post('/login',function(req, res, next){
    try {
        let userInfo = {
            userName:req.body.userName,
            passWord:req.body.passWord,
        };
        SecurityManage.subject.securityManage.login(userInfo);
        res.redirect('index');
        res.end();
    }
    catch (e){
        ResponseUtil.returnResponseErr(res,"登录失败",e);
    }
});

module.exports = router;
