/**
 * mongoose的modle和document相关的工具类
 * Created by wu199406 on 2017/6/1.
 */

let mongoose = require("mongoose");

class MongooseModelUtil
{
    constructor(){}

    /**
     * 将mongoose的document实例的数组转换为纯净的js对象
     * @param list  mongoose的document实例的数组
     * @return {Array}  纯净的js对象的数组
     *
     */
    static toObjectByArray(list)
    {
        if(Array.isArray(list))
        {
            let newList = new Array();

            for(let element of list)
            {
                if( element instanceof mongoose.Model)
                {
                    newList.push(element.toObject());
                }
                else
                {
                    throw new Error("数组的元素必须是mongoose的Model的document实例");
                }
            }
            return newList;
        }
        else
        {
            throw new Error("第一个参数必须为数组");
        }
    }
}

module.exports = MongooseModelUtil;
