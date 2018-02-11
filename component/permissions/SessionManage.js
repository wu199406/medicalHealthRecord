/**
 * Created by wu199406 on 2018/2/7.
 */

let Session = require('./Session');

let defaultSessionOptions={
    sessionIdName:'1hdsakh',
    timeout:0,
};

/**
 * 负责：
 * 1.管理回话的sessionId，为未有sessionId的回话添加sessionId。
 * 2.管理回话信息。
 *
 * @class SessionManager
 * @desc 回话管理器类
 */
class SessionManage {

    /**
     * @param {Object} option - 配置对象
     * @param {CacheManage} option.cacheManage - 缓存管理器
     * @param {String} option.cacheType - 使用的缓存类型
     * @param {Object} option.sessionOptions - 回话id配置对象
     * @param {String} [option.sessionOptions.sessionIdName='1hdsakh'] - 回话id的名称
     * @param {Number} [option.sessionOptions.timeout=0] - 回话id的保存时间，等于0时保存时间为无限
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

        /**
         * @private
         * 当访问的用户的回话id
         * @type {null}
         */
        this.currentSessionId = null;

        this.options = Object.assign({}, defaultSessionOptions,option.sessionOptions);
    }

    /**
     * 根据请求中的cookie信息设置当前的回话的id
     * @param {Express.Request|*} req - 请求对象
     * @param {Express.Response|*} res - 相应对象
     */
    manageSessionId(req,res){
        let sessionId = req.cookies[this.options.sessionIdName];//获取回话id
        if(typeof sessionId === 'string' && sessionId.length > 0){
            let session = this.cacheManage.get(sessionId,this.cacheType);
            if(session === undefined || session === null) {
                sessionId = this.sessionGenerator(res);
            }else{
                sessionId = session.sessionId;
            }
        }else {
            sessionId = this.sessionGenerator(res);
        }
        this.currentSessionId = sessionId;
    }

    /**
     * 获取指定的sessionId的回话信息对象
     * @param {String} sessionId
     * @return {Session} 返回回话信息对象
     */
    getSession(sessionId){
        return this.cacheManage.get(sessionId,this.cacheType);
    }

    /**
     * 获取当前的用户的session对象
     * @return {Session} 返回当前用户的session对象
     */
    getCurrentSession(){
        return this.cacheManage.get(this.currentSessionId,this.cacheType);
    }

    /**
     * 增加一个sessionId
     * @public
     * @param {String} sessionId
     */
    addSession(sessionId){
        let session = new Session(sessionId);
        this.cacheManage.set(sessionId,session,this.cacheType);
    }

    /**
     * 更新一个回话信息
     * @param {String} sessionId
     * @param {Object} session - 回话信息对象
     */
    updateSession(sessionId,session){
        this.cacheManage.set(sessionId,session,this.cacheType);
    }

    /**
     * 更新最新访问事件
     * @param {String} sessionId
     */
    updateLastestTime(sessionId){
        let session = this.cacheManage.get(sessionId,this.cacheType);
        session.lastestTime = new Date();
        this.cacheManage.set(sessionId,session,this.cacheType);
    }

    /**
     * 记录登录状态信息
     * @param {String} sessionId
     */
    saveLoginedState(sessionId){
        let session = this.cacheManage.get(sessionId,this.cacheType);
        session.isLogin = true;
        this.cacheManage.set(sessionId,session,this.cacheType);
    }

    /**
     * 移除登录状态信息
     * @param {String} sessionId
     */
    removeLoginedState(sessionId){
        let session = this.cacheManage.get(sessionId,this.cacheType);
        session.isLogin = false;
        this.cacheManage.set(sessionId,session,this.cacheType);
    }

    /**
     * @public
     * 获取登录状态信息。
     * @param {Express.Request|*} req - 请求对象
     * @param {Express.Response|*} res - 相应对象
     * @return {boolean}    true：表示已经登录；false：表示未登录；
     */
    getLoginedState(req,res){
        let session = this.cacheManage.get(this.currentSessionId,this.cacheType);
        return session.isLogin;
    }

    /**
     * @private
     * 为相应添加sessionId,同时记录回话id信息
     * @param res
     * @return {String} 返回新创建的sessionId
     */
    sessionGenerator(res){
        let option = {httpOnly:true};
        let sessionId = this.generatorSessionId();
        let expires = this.generatorExpires();
        if( expires instanceof  Date )
        {
            option.expires = expires;
        }

        res.cookie(this.options.sessionIdName,sessionId,option);

        this.addSession(sessionId);//记录回话信息

        return sessionId;
    }

    /**
     * @private
     * 生成回话id
     * @return {string} 返回回话id
     */
    generatorSessionId(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

    /**
     * @private
     * 生成(expires)超时时间
     * @return {Date|String} 返回超市时间
     */
    generatorExpires(){
        if(typeof this.options.timeout === 'number' && this.options.timeout > 0 ) {
            return new Date( Date.now() + this.options.timeout );
        }
        else {
            return 'never';
        }
    }
}

module.exports = SessionManage;