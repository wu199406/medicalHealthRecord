/**
 * 用于封装分页信息的工具类
 * Created by wu199406 on 2017/6/2.
 */

class PageUtil
{
    constructor()
    {
        this.rows = [];//存储记录的数组
        this.total = 0;//当前记录的总数数量
    }

    /**
     * 设置分页信息
     * @param rows  {Array}  存储记录的数组
     * @param total {Number} 当前记录的总数数量
     */
    setPage( rows , total )
    {
        this.rows = rows;
        this.total = total;
    }
}

module.exports = PageUtil;
