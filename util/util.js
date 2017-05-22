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
}

module.exports = util;



