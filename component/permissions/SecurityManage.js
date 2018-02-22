/**
 * Created by wu199406 on 2018/2/9.
 */

class SecurityManage{

    /**
     * @param {Object} option - 配置对象
     * @param {SessionManage} option.sessionManage - 回话管理器
     * @param {CacheManage} option.cacheManage - 缓存管理器
     * @param {FilterManage} option.filterManage - 拦截器管理对象
     * @param {PermissionManage} option.permissionManage - 权限信息管理器
     * @param {String} option.loginUrl - 如果没有登录就访问,就跳转到该路径
     * @param {String} option.successUrl - 登录成功后跳转的路径
     * @param {String} option.unauthorizedUrl - 没有权限跳转的路径
     * @param {Array.String} option.unInterceptUrls - 不拦截检查的路径集合
     */
    constructor(option){
        /**
         * 回话管理器
         * @private
         * @type {SessionManage}
         */
        this.sessionManage = option.sessionManage;

        /**
         * 缓存管理器
         * @private
         * @type {cacheManage}
         */
        this.cacheManage = option.cacheManage;

        /**
         * 拦截器管理对象
         * @type {FilterManage}
         */
        this.filterManage = option.filterManage;

        /**
         * 权限信息管理器
         * @type {PermissionManage}
         */
        this.permissionManage = option.permissionManage;

        /**
         * 如果没有登录就访问,就跳转到该路径
         * @type {String}
         */
        this.loginUrl = option.loginUrl;
        /**
         *  登录成功后跳转的路径
         *  @type {String}
         */
        this.successUrl = option.successUrl;
        /**
         * 没有权限跳转的路径
         * @type {String}
         */
        this.unauthorizedUrl = option.unauthorizedUrl;
        /**
         * 不拦截检查的路径集合
         * @type {Array.String}
         */
        this.unInterceptUrls = option.unInterceptUrls;

        SecurityManage.subject.securityManage = this;
    }

    /**
     * 判断当前请求的资源是否是不拦截的资源
     * @param {Express.Request|*} req - 请求对象
     * @param {Express.Response|*} res - 相应对象
     * @return {Boolean} true:是不拦截的资源；false，是拦截的资源
     */
    isUnInterceptUrl(req,res){
        //获取请求的资源的名称
        let queryUrl =  req.originalUrl;

        if(Array.isArray(this.unInterceptUrls)) {
            return this.unInterceptUrls.some((item,index)=>{
                if(queryUrl.indexOf(item) !== -1) {
                    return true;
                }
            });
        }
        else{
            throw new Error('unInterceptUrls必须是字符串数组');
        }
    }

    /**
     * 进行身份验证，验证用户是否已经登录
     * @param {Express.Request|*} req - 请求对象
     * @param {Express.Response|*} res - 相应对象
     * @return {Boolean} true：已经登录；false：未登录。
     */
    doAuthentication(req,res){
        return this.sessionManage.getLoginedState(req,res);
    }

    /**
     * 进行权限验证，验证用户是否具有请求的资源的权限
     * @param {Express.Request|*} req - 请求对象
     * @param {Express.Response|*} res - 相应对象
     * @return {Boolean} true：有该权限；false：没有该权限。
     */
    async doAuthorization(req,res){
        //获取请求的资源路径用于判断用户是否拥有该资源的权限
        let queryUrl =  req.originalUrl;

        //判断用户是否有该权限的资源
        return await this.permissionManage.authorization(this.sessionManage.getCurrentSession() ,queryUrl);
    }

    /**
     * 提供给外部应用的核心拦截器
     * 判断请求的资源是否有相应的权限,并根据结果的不同进行不同的操作
     * @param {Express.Request|*} req - 请求对象
     * @param {Express.Response|*} res - 相应对象
     * @param {Function} next -
     */
    async filterProcessor(req,res,next){
        //管理当前请求的sessionId，这是必须的
        this.sessionManage.manageSessionId(req,res);

        //调用拦截链
        this.filterManage.performFilter(req,res);

        //判断当前请求的资源是否拦截，不拦截就开发该资源的访问
        let isUnInterceptUrl = this.isUnInterceptUrl(req,res);
        if( isUnInterceptUrl === true ) {
            next();
        }
        else {
            //判断是否已经登录
            let isLogin = this.doAuthentication(req,res);

            if(isLogin === false) {
                //重定向到登录页面
                res.redirect(this.loginUrl);
                res.end();
            } else {
                //判断是否含有相应的权限
                let hasPermission = await this.doAuthorization(req,res);
                if(hasPermission === false){
                    //重定向到没有权限页面
                    res.redirect(this.unauthorizedUrl);
                    res.end();
                }
                else{
                    next();
                }
            }
        }
    }

    /**
     * 登录，同时保存sessionId对应的用户信息
     * @param {Object} userInfo - 要进行登录的用户的信息对象
     * @param {String} userInfo.userName - 登录的用户名称
     * @param {String} userInfo.passWord - 登录的密码
     * @throws {Error} 登录失败时抛出异常
     */
    async login(userInfo){
        userInfo = await this.permissionManage.authentication(userInfo.userName,userInfo.passWord);
        if(userInfo !== undefined && userInfo !== null) {
            let currentSession = this.sessionManage.getCurrentSession();
            currentSession.isLogin = true;
            currentSession.setUserInfoAfterLogin(userInfo);
            this.sessionManage.updateSession(currentSession.sessionId,currentSession);
        }
        else{
            throw new Error('登录失败');
        }
    }

    /**
     * 登出
     */
    logout(){
        let session = this.sessionManage.getCurrentSession();
        session.isLogin = false;
        this.sessionManage.updateSession(session.sessionId,session);
    }
}

/**
 * SecurityManage的静态属性，用于全局使用
 * @type {Object}
 *
 * @property {Express.Request} req
 * @property {Express.Request} req
 */
SecurityManage.subject = {
    sessionId:null,
    SecurityManage:null
};

module.exports = SecurityManage;