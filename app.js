let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');//提供从请求读取cookie和在相应中设置cookie的功能
let session = require("express-session");//提供session功能
let bodyParser = require('body-parser');//提供了将post请求的正文中的json数据解释为req.body属性

let securityManage = require('./component/permissions/index');

//引入数据库接口，启动mongodb数据库
let dao = require("./dao/daoInterface.js");

//引入路由入口模块
let routEntrance = require("./routes/routEntrance");

let app = express();

// view engine setup，设置和配置模版引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("session"));
app.use(session({
    secret: 'session',//与cookieParser中的一致
    resave: true,
    saveUninitialized:true
}));

app.use(express.static(path.join(__dirname, 'public')));//管理静态文件

//配置权限拦截器中间件
app.use(function (req, res, next) {
    securityManage.filterProcessor(req, res, next);
});

//调用路由入口配置函数，配置路由
routEntrance(app);

// catch 404 and forward to error handler
//找不到错误
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
    console.log(err)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
