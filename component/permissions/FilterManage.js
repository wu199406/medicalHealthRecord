/**
 * Created by wu199406 on 2018/2/8.
 */

/**
 * 拦截器管理类
 */
class FilterManage{
    /**
     *
     * @param {Object} option - 配置对象
     * @param {SessionManage} option.sessionManage - 缓存管理对象
     * @param {Filter|Array[Filter]} option.filters
     */
    constructor(option){

        /**
         * 缓存管理对象
         * @type {sessionManage}
         */
        this.sessionManage = option.sessionManage;

        /**
         * 拦截器数组
         * @type {Filter|Array[Filter]}
         */
        this.filters = (Array.isArray(option.filters))?option.filters:[];

        /**
         * @private
         * 下一个拦截器的索引
         * @type {Filter}
         */
        this.nextFilterIndex = null;
    }

    /**
     * 添加拦截器
     * @param {Filter|Array[Filter]} filters
     */
    addFilter(filters){
        this.filters.push(filters);
    }

    /**
     * 调用拦截器链上的所有拦截器
     *
     * @param {Express.Request|*} req - 请求对象
     * @param {Express.Response|*} res - 相应对象
     */
    performFilter(req,res){
        this.nextFilterIndex = 0;//设置下一个拦截器的索引为0
        this.performNextFilter(req,res);
    }

    /**
     * @private
     * 这里将调用下一个拦截器的方法交给当前调用的拦截器
     * @param {Express.Request|*} req - 请求对象
     * @param {Express.Response|*} res - 相应对象
     */
    performNextFilter(req,res){
        if(this.filters[this.nextFilterIndex])
        {
            let index = this.nextFilterIndex;
            this.nextFilterIndex++;
            this.filters[index].setFilterManager(this);
            this.filters[index].filterHandler(req,res,this.performNextFilter);
        }
    }
}

/**
 * @interface
 */
class Filter{

    constructor(){
        /**
         * 拦截器管理对象
         * @type {FilterManage}
         */
        this.filterManager = null;
    }

    /**
     * 设置拦截器管理对象
     * @param {FilterManage} filterManager - 拦截器管理对象
     */
    setFilterManager(filterManager){
        this.filterManager = filterManager;
    }

    /**
     * @param {Express.Request|*} req - 请求对象
     * @param {Express.Response|*} res - 相应对象
     * @param {Function} next - 下一个拦截器
     */
    filterHandler(req,res,next){}
}

module.exports = {
    FilterManage,
    Filter
};