/**
 * 权限组件的入口文件
 *
 * Created by wu199406 on 2018/2/6.
 */

let CacheManage = require('../../component/permissions/CacheManage');
let SessionManage = require('../../component/permissions/SessionManage');
let {PermissionManage} = require('../../component/permissions/PermissionManage');
let {FilterManage} = require('../../component/permissions/FilterManage');
let SecurityManage = require('../../component/permissions/SecurityManage');

const MyRealm = require('./MyRealm');

//创建缓存管理器
let cacheManage = new CacheManage({defaultType:'default',types:[]});

//创建回话管理器
let sessionManage = new SessionManage({cacheManage:cacheManage,cacheType:'default',sessionOptions:{timeout:1000*2000}});

//创建
let myRealm = new MyRealm();
let permissionManage = new PermissionManage({
    cacheManage:cacheManage,
    cacheType:'default',
    realm:myRealm
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
    loginUrl:'/login',
    unauthorizedUrl:'/unau',
    unInterceptUrls:['login','logout','unau']
});

//export default permissionManger;
module.exports = securityManage;
