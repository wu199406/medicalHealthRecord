/**
 * Created by wu199406 on 2018/2/7.
 */

/**
 * @class Session
 * @desc 回话信息类，负责管理和记录用户的回话信息，如sessionId，以及用户信息。
 * 用户信息必须在登陆成功后设置。
 */
class Session{

    /**
     * @constructor
     * @param {String} sessionId - 回话id
     * @param {Date} [initialTime=new Date()] - 最初访问时间
     * @param {Date} [lastestTime=new Date()] - 最新的访问时间
     * @param {Boolean} [isLogin=false] - 是否已经登录
     * @param {Object} [userInfo] - 用户的个人信息
     */
    constructor(sessionId,initialTime=new Date(),lastestTime=new Date(),isLogin=false,userInfo){
        /**
         * 回话id
         * @type {String}
         */
        this.sessionId=sessionId;
        /**
         * 最初访问时间
         * @type {Date}
         */
        this.initialTime=initialTime;
        /**
         * 最新的访问时间
         * @type {Date}
         */
        this.lastestTime=lastestTime;
        /**
         * 是否已经登录
         * @type {boolean}
         */
        this.isLogin=isLogin;

        /**
         * 用户的个人信息
         * @type {Object}
         */
        this.userInfo = userInfo;
    }

    /**
     * 在登录成功后设置用户的个人信息对象
     * @param {Object} userInfo - 用户的个人信息对象
     */
    setUserInfoAfterLogin(userInfo){
        this.userInfo = userInfo;
    }
}

module.exports = Session;