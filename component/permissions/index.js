/**
 * 权限组件的入口文件
 *
 * Created by wu199406 on 2018/2/6.
 */

let CacheManage = require('./CacheManage');
let SessionManage = require('./SessionManage');
let {PermissionManage, Realm} = require('./PermissionManage');
let {FilterManage} = require('./FilterManage');
let SecurityManage = require('./SecurityManage');

//创建缓存管理器
let cacheManage = new CacheManage({defaultType:'default',types:[]});

//创建回话管理器
let sessionManage = new SessionManage({cacheManage:cacheManage,cacheType:'default',sessionOptions:{timeout:1000*2000}});

//创建
let realm = new Realm();
let permissionManage = new PermissionManage({
    cacheManage:cacheManage,
    cacheType:'default',
    realm:realm
});

let filterManage = new FilterManage({
    sessionManage:sessionManage,
    filters:[]
});

let securityManage = new SecurityManage({
    sessionManage:sessionManage,
    cacheManage:cacheManage,
    filterManage:filterManage,
    permissionManage:permissionManage,
    loginUrl:'login',
    unauthorizedUrl:'unau',
    unInterceptUrls:['login','logout','unau']
});

//export default permissionManger;
module.exports = securityManage;
