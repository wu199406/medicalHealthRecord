/**
 * Created by wu199406 on 2018/1/23.
 */

class FileCommonUtil{
    //默认的构造函数
    constructor (){}

    /**
     * 从文件名中获取文件的名称和类型
     *
     * @param fileName 文件名
     * @return {{name:String, type:String}}
     */
    static getFileNameAndType(fileName)
    {
        var dotIndex = fileName.lastIndexOf('.');
        return {name:fileName.slice(0,dotIndex),type:fileName.slice(dotIndex+1)};
    }

    /**
     * 获取文件路径相对与绝对路径的路径
     *
     * @param {String} filePath  文件路径
     * @param {String} absolutePath 绝对路径
     * @return {String} 返回相对与绝对路径的路径
     */
    static getRelativePath(filePath,absolutePath)
    {
        let relativePath = filePath.replace(absolutePath.replace(/\//g,'\\'),'');
        return relativePath;
    }
}

module.exports = FileCommonUtil;
