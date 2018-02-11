/**
 * Created by wu199406 on 2018/2/9.
 */

/**
 * 缓存管理器
 */
class CacheManage{

    /**
     * @param {Object} option - 配置对象
     * @param {String} option.defaultType - 默认的类型
     * @param {Array.<Object>} option.types - 配置的类型信息对象数组
     */
    constructor(option){

        /**
         * 默认使用的缓存类型
         * @type {String}
         */
        this.defaultType = option.defaultType;

        /**
         * 配置的类型信息对象数组
         * @type {Array.<Object>}
         */
        this.types = option.types;

        /**
         * 管理回话对象的map集合
         * @type {Map}
         */
        this.sessions = new Map();
    }

    /**
     * 获取缓存中key所指定的内容
     * @param {String} key - 键
     * @param {String} [type=defaultType] - 使用的缓存类型的名称
     * @return {Session} 返回回话信息对象
     */
    get(key,type=this.defaultType){
        return this.sessions.get(key);
    }

    /**
     * 设置key指定的缓存内容
     * @param {String} key - 键
     * @param {Object} info - 缓存的内容
     * @param {String} [type=defaultType] - 使用的缓存类型的名称
     */
    set(key,info,type=this.defaultType){
        this.sessions.set(key,info);
    }
}

module.exports = CacheManage;