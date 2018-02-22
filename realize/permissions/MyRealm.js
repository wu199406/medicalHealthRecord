/**
 * Created by wu199406 on 2018/2/22.
 */

let {Realm} = require('../../component/permissions/PermissionManage');

let mongoose = require("mongoose");
const userModel = mongoose.model("user");
const roleModel = mongoose.model("role");
const resourceModel = mongoose.model("resource");

/**
 * @implements {Realm}
 */
class MyRealm extends Realm
{
    constructor(){
        super();
    }

    /**
     * @override
     * 获取身份验证信息
     * @param {String} username - 用户名称
     * @return {Object} 返回用户信息对象。如果匹配username的文档只有一个时，就返回该model；否则大于一个或者小于一个文档时都返回null。
     * @throws {Error} 如果参数username不是非空字符串就抛出异常。
     */
    async doGetAuthenticationInfo(username){

        if(typeof username === 'string' && username.length>0) {

            let queryResult = await userModel.find({userName:username});

            if(queryResult.length===1) {
                return queryResult[0].toObject();
            }else{
                return null;
            }
        }else{
            throw new Error(`username必须为非空字符串`);
        }
    }

    /**
     * @override
     * 获取授权信息
     * @param {String} userId - 用户id
     * @return {Array.<string>} 返回用户的权限信息对象
     */
    async doGetAuthorizationInfo(userId){
        let authorizationInfo = [];

        let userQueryResult = await userModel.find({id:userId});
        if(userQueryResult.length===1) {
            let roleIds = userQueryResult[0].roles;

            if(roleIds.length>0){
                let roleQueryResult = await roleModel.find({id:{$in:roleIds}});

                for(let role of roleQueryResult) {
                    let resourceQueryResult = await resourceModel.find({id:{$in:role.resources}});

                    resourceQueryResult.forEach((item,index)=>{
                        if(typeof item.url === 'string' && item.url.length>0){
                            authorizationInfo.push(item.url);
                        }
                    });
                }
            }
        }

        return authorizationInfo;
    }

    /**
     * @override
     * 获取需要授权的资源的信息
     * @param {String} userId - 用户id
     * @return {Array.<string>} 返回需要授权的资源的数据
     */
    async doGetChainDefinitionSection(userId){
        let chainDefinitionSection = [];

        let resourceQueryResult = await resourceModel.find();

        resourceQueryResult.forEach((item,index)=>{
            if(typeof item.url === 'string' && item.url.length>0){
                chainDefinitionSection.push(item.url);
            }
        });

        return chainDefinitionSection;
    }
}

module.exports = MyRealm;