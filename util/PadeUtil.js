/**
 * Created by wu199406 on 2017/5/22.
 */
class PadeUtil
{
    constructor(){}

    /**
     * 根据页码和分页的大小，计算出分页的开始索引
     * @param page
     * @param row
     * @return {{}}
     */
    static computePageStartIndex(page,row)
    {
        return page * row - 1;
    }
}

module.exports = PadeUtil;