/**
 * 文件的通用上传路由
 *
 * Created by wu199406 on 2018/1/23.
 */
const express = require('express');
const multer = require('multer');

const config = require('../config/config');
let Util = require("../util/Util");
let QueryParamUtil = require("../util/QueryParamUtil");
let ResponseUtil = require("../util/ResponseUtil");
let FileCommonUtil = require('../util/FileCommonUtil');
let fs = require('fs');

const router = express.Router();

let UploadFileService = require("../service/UploadFileService");//获取服务类
let uploadFileService = new UploadFileService();//创建服务实例

//设置磁盘存储引擎
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,config.upload.path)
    },
    filename: function (req, file, cb) {
        let {name,type} = FileCommonUtil.getFileNameAndType(file.originalname);
        cb(null, name+'-'+Date.now()+'.'+type);
    }
});
let upload = multer({ storage: storage });

router.post('/upload', upload.single('file') ,async function(req, res, next) {
    try
    {
        if(req.file != undefined && req.file != null)
        {
            let file = req.file;
            let uploadFile = await uploadFileService.add({
                fileName:file.originalname,
                filePath:FileCommonUtil.getRelativePath(file.path,config.upload.path),
                fileSize:file.size,
                mimeType:file.mimeType
            });

            ResponseUtil.returnResponseSuccess(res,"上传成功",uploadFile.toObject());
        }
    }
    catch (e)
    {
        console.log(e);
        ResponseUtil.returnResponseErr(res,"上传失败",e);
    }
});

router.post('/delete',async function (req, res, next) {
    try
    {
        //获取请求的内容对象
        let queryParam = QueryParamUtil.getQueryParamsMayHasEmpty(req, true);
        let idArray = JSON.parse(queryParam.idArray);
        if( Array.isArray(idArray) )
        {
            for(let id of idArray)
            {
                uploadFileService.delete(id);
            }
        }
        ResponseUtil.returnResponseSuccess(res,"删除成功");
    }
    catch(e)
    {
        console.log(e);
        ResponseUtil.returnResponseErr(res,"删除失败",e);
    }

});

/**
 * 下载一个文件
 */
router.get('/down',async function(req, res, next) {
    let queryParam = QueryParamUtil.getQueryParamsMayHasEmpty(req, true);
    let id = queryParam.id;

    let uploadFile = await uploadFileService.findByIdOfBase(id);

    if( !Util.isEmpty(uploadFile) && Util.isNotEmptyString(uploadFile.filePath))
    {
        let filePath = config.upload.path+uploadFile.filePath;
        filePath = filePath.replace(/\\/g,'/');

        fs.exists(filePath,function(exist) {
            if(exist){
                res.set({
                    "Content-type":"application/octet-stream",
                    "Content-Disposition":"attachment;filename="+encodeURI(uploadFile.fileName)
                });
                let fReadStream = fs.createReadStream(filePath);
                fReadStream.on("data",(chunk) => res.write(chunk,"binary"));
                fReadStream.on("end",()=>{res.end();});
            }else{
                res.set("Content-type","text/html");
                res.send("file not exist!");
                res.end();
            }
        });
    }
});


module.exports = router;
