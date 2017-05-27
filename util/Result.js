/**
 * 用于返回操作结果的对象
 * Created by wu199406 on 2017/3/5.
 */

class Result
{
    //构造函数
    constructor (success,msg,obj)
    {
        this.success = success;
        this.msg = msg;
        this.obj = obj;
    }
}

module.exports = Result;