/**
 * Created by wu199406 on 2018/2/7.
 */

/**
 * 负责登录的身份验证，权限认证
 *
 * @class
 * @desc 权限管理器类
 */
class PermissionManage {

    /**
     * @constructor
     * @param {Object} option - 配置对象
     * @param {cacheManage} option.cacheManage - 缓存管理器
     * @param {String} option.cacheType - 使用的缓存类型
     * @param {Realm} option.realm - 数据领域
     */
    constructor(option){
        /**
         * 缓存管理器
         * @type {CacheManage}
         */
        this.cacheManage = option.cacheManage;

        /**
         * 使用的缓存类型
         * @type {String}
         */
        this.cacheType = option.cacheType;

        this.realm = option.realm;
    }

    /**
     * 进行身份验证
     *
     * @param {String} username - 用户名称
     * @param {String} password - 用户密码
     * @return {Object} 验证成功:返回用户信息对象，否则返回null
     */
    async authentication(username,password){
        //获取身份信息
        let userInfo = await this.realm.doGetAuthenticationInfo(username);

        if(userInfo.passWord === password) {
            //进行身份验证
            return userInfo;
        }
        else{
            return null;
        }
    }

    /**
     * 进行权限判断,判断用户是否拥有targetResource(目标资源)的权限
     * @param {Session} session - 当前的回话信息对象
     * @param {String} targetResource - 目标资源/需要的权限
     * @return {Boolean} 具有相应的权限,返回true,否则返回false
     */
    async authorization(session,targetResource){
        let userId = session.userInfo.id;

        //获取需要授权的资源的数组
        let ChainDefinitionSection = await this.getChainDefinitionSection(userId);
        //判断当前请求的资源是否被拦截
        let isFilterUrl = ChainDefinitionSection.some((item,index)=>{
            if(targetResource.indexOf(item) !== -1){
                return true;
            }
        });

        //如果需要拦截
        if(isFilterUrl === true) {
            //获取当前用户拥有的权限
            let authorizationInfo = await this.getAuthorization(userId);
            //判断用户是否拥有请求的资源的权限
            return authorizationInfo.some((item,index)=>{
                if(targetResource.indexOf(item) !== -1){
                    return true;
                }
            });
        } else {
            return true;
        }
    }

    /**
     * @private
     * 从realm或者缓存中，获取授权信息
     * 如果缓存中不存在授权信息，就使用realm去获取并将获取的信息缓存起来。
     * @param {String} userId - 用户id
     * @return {Array.<string>} 返回用户的权限信息对象
     */
    async getAuthorization(userId){
        let oldAuthorizationInfo = this.cacheManage.get(userId+'-author',this.cacheType);

        if(oldAuthorizationInfo !== undefined && oldAuthorizationInfo !== null){
            return oldAuthorizationInfo;
        }
        else {
            let newAuthorizationInfo = await this.realm.doGetAuthorizationInfo(userId);
            this.cacheManage.set(userId+'-author',newAuthorizationInfo,this.cacheType);
            return newAuthorizationInfo;
        }
    }

    /**
     * @private
     * 从realm或者缓存中，获取需要授权的资源的信息。
     * 如果缓存中不存在授权的资源的信息，就使用realm去获取并将获取的信息缓存起来。
     * @param {String} userId - 用户id
     * @return {Array.<string>} 返回需要授权的资源的数据
     */
    async getChainDefinitionSection(userId){
        let oldChainDefinitionSection = this.cacheManage.get(userId+'-cds',this.cacheType);

        if(oldChainDefinitionSection !== undefined && oldChainDefinitionSection !== null){
            return oldChainDefinitionSection;
        }
        else{
            let newChainDefinitionSection = await this.realm.doGetChainDefinitionSection(userId);//通过realm获取数据
            this.cacheManage.set(userId+'-cds',newChainDefinitionSection,this.cacheType);//缓存数据
            return newChainDefinitionSection;
        }

    }
}

/**
 * @interface
 * 数据领域，用于获取身份验证信息和授权信息
 */
class Realm{
    /**
     * @abstract
     * 获取身份验证信息
     * @param {String} username - 用户名称
     * @return {Object} 返回用户信息对象。如果匹配username的文档只有一个时，就返回该model；否则大于一个或者小于一个文档时都返回null。
     * @throws {Error} 如果参数username不是非空字符串就抛出异常。
     */
    async doGetAuthenticationInfo(username){}

    /**
     * @abstract
     * 获取授权信息
     * @param {String} userId - 用户id
     * @return {Array.<string>} 返回用户的权限信息对象
     */
    async doGetAuthorizationInfo(userId){}

    /**
     * @abstract
     * 获取需要授权的资源的信息
     * @param {String} userId - 用户id
     * @return {Array.<string>} 返回需要授权的资源的数据
     */
    async doGetChainDefinitionSection(userId){}
}

module.exports = {PermissionManage, Realm};