/**
 * Created by wu199406 on 2017/5/13.
 */

class ModelUtil
{
    constructor(){}

    /**
     * 获取纯净的js对象的所有的自有属性名称数组
     * @param entity
     * @param removePropertyNames
     * @return {Array-String}返回对象自身的属性键值的字符串数组
     */
    static getUpdatePropertyNames(entity,removePropertyNames)
    {
        let updatePropertyNames = Reflect.ownKeys(entity);

        if( removePropertyNames && Array.isArray(removePropertyNames) && removePropertyNames.length > 0)
        {
            updatePropertyNames = updatePropertyNames.filter(function(element, index, array){
                if(removePropertyNames.includes(element))
                {
                    return false;
                }
                else
                {
                    return true;
                }
            });
        }

        return updatePropertyNames;
    }

    /**
     * 获取纯净的js对象的所有的自有属性名称数组，并且属性对应的值应该不为null和空字符串
     * @param entity {Object}
     * @param removePropertyNames {Array(String)}
     * @return {Array-String}返回对象自身的属性键值的字符串数组
     */
    static getUpdatePropertyNamesNotNull(entity,removePropertyNames)
    {
        let updatePropertyNames = Reflect.ownKeys(entity);
        updatePropertyNames = updatePropertyNames.filter(function(element, index, array){
            let value = entity[element];
            if( value!=undefined && value!=null )
            {
                if( typeof value == "string" && value.trim() == "" )
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
            else
            {
                return false;
            }
        });

        if( removePropertyNames && Array.isArray(removePropertyNames) && removePropertyNames.length > 0)
        {
            updatePropertyNames = updatePropertyNames.filter(function(element, index, array){
                if(removePropertyNames.includes(element))
                {
                    return false;
                }
                else
                {
                    return true;
                }
            });
        }
        return updatePropertyNames;
    }

    /**
     * 从一个对象中获取其非空属性组成的新对象
     * @param obj
     * @return {{}}
     */
    static getPropertyNotNullObject(obj)
    {
        let updatePropertyNames = Reflect.ownKeys(obj);
        updatePropertyNames = updatePropertyNames.filter(function(element, index, array){
            let value = obj[element];
            if( value!=undefined && value!=null )
            {
                if( typeof value == "string" && value.trim() == "" )
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
            else
            {
                return false;
            }
        });

        var newObj = {};
        for(let i=0;i<updatePropertyNames.length;i++)
        {
            newObj[updatePropertyNames[i]] = obj[updatePropertyNames[i]];
        }

        return newObj;
    }
}

module.exports = ModelUtil;