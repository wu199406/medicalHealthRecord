/**
 * Created by wu199406 on 2018/1/23.
 */

let mongoose = require("mongoose");
let Util = require('../Util/Util');
let BaseService = require("../service/BaseService");
const config = require('../config/config');
let fs = require('fs');

const uploadFileModel = mongoose.model("uploadFile");

class UploadFileService extends BaseService
{
    constructor()
    {
        super(uploadFileModel);
    }

    /**
     * 使用创建新model实例的方式新增一个文档
     * @param entity
     * @return {*|mongoose.model}   返回创建的文档
     */
    async add(entity){
        let uploadFile = new this.model(entity);
        await uploadFile.save();
        return uploadFile;
    }

    /**
     * 根据id删除上传文件和文档记录
     *
     * @param id    文档的id主键
     * @return {null} 返回null
     */
    async delete(id){
        let uploadFile = await this.findByIdOfBase(id);

        if( uploadFile!=undefined && uploadFile!=null )
        {
            let result = await this.deleteByIdOfBase(id);
            await new Promise((resolve, reject) => {
                fs.unlink(config.upload.path+uploadFile.filePath,(err) => {
                    if (err)
                    {
                        reject(err);
                    }
                    else
                    {
                        resolve(true);
                    }
                });
            });
        }

        return null;
    }
}

module.exports = UploadFileService;
