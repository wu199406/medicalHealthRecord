/**
 * Created by wu199406 on 2017/3/2.
 */

var is ={
    types : ["Array", "Boolean", "Date", "Number", "Object", "RegExp", "String", "Window", "HTMLDocument"]
};
for(var i = 0, c; c = is.types[i ++ ]; ){
    is[c] = (function(type) {
        return function (obj) {
            return Object.prototype.toString.call(obj) == "[object " + type + "]";
        }
    })(c);
}

/**
 * 创建通用工具类util
 */
class util{
    //默认的构造函数
    constructor (){}

    static isString(obj)
    {
        return is.String(obj);
    }

    static isNotEmptyString(str)
    {
        if( is.String(str) && str.trim() != "" )
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    /**
     * 如果参数obj是undefined、null、空字符串或者由多个空字符串组成的字符串时，返回true；否则返回false。
     * @param obj
     * @return {boolean}
     */
    static isEmpty(obj)
    {
        if(obj == undefined || obj == null)
        {
            return true;
        }
        else if( util.isString(obj) && obj.trim() == "" )
        {
            return true;
        }
        return false;
    }

    /**
     * 删除参数对象中的为空的属性，会影响参数对象
     * @param obj
     * @return {*}
     */
    static getNotNUllParams(obj)
    {
        Reflect.ownKeys(obj).forEach(function (value, index, array) {
            if(util.isEmpty(obj[value]))
            {
                Reflect.deleteProperty(obj,value);
            }
        });
        return obj;
    }

    /**
     * 将对象中的空字符串设置为null
     * @param obj   {Object}    js纯净对象
     * @return {*}
     */
    static setEmptyStrToNullOfObj(obj)
    {
        Reflect.ownKeys(obj).forEach(function (value, index, array) {
            if(util.isString(obj[value]) && obj[value].trim() == "")
            {
                obj[value] = null;
            }
        });
        return obj;
    }
}

module.exports = util;



