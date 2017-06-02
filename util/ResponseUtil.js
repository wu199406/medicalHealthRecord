/**
 * Created by wu199406 on 2017/5/26.
 */

let Result = require("../vo/Result");

/**
 * 用于简化Express框架下返回操作结果的工具类
 */
class ResponseUtil
{
    constructor(){}

    /**
     * 用于操作成功时返回结果信息
     * @param response  {Express.Response}   Express框架的response对象
     * @param msg   {String}    操作的结果信息
     */
    static returnResponseSuccess(response,msg)
    {
        let result = new Result(true,msg,null);
        response.send(JSON.stringify(result));
        response.end();
    }

    /**
     * 用于操作失败时返回结果信息
     * @param response {Express.Response}   Express框架的response对象
     * @param msg   {String}    操作的结果信息
     * @param err   {Error} 错误对象
     */
    static returnResponseErr(response,msg,err)
    {
        let result = new Result(false,msg,err);
        console.log(err);
        response.send(JSON.stringify(result));
        response.end();
    }
}

module.exports = ResponseUtil;