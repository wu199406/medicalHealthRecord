/**
 * Created by wu199406 on 2018/1/16.
 */

//导入工具类
const config = require('../config/config');
let Util = require("../util/Util");
let QueryParamUtil = require("../util/QueryParamUtil");
let ResponseUtil = require("../util/ResponseUtil");
let PageUtil = require("../vo/PageUtil");
let FileCommonUtil = require('../util/FileCommonUtil');

let express = require('express');
const multer = require('multer');

let BackgroundCaseService = require("../service/BackgroundCaseService");//获取服务类
let UploadFileService = require("../service/UploadFileService");//获取服务类

let router = express.Router();

let backgroundCaseService = new BackgroundCaseService();//创建服务实例
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

router.get("/index",function(req, res, next){
    res.render('business/backgroundCase', {});
});

router.post("/selectPage",async function(req, res, next){
    try
    {
        //获取请求的内容对象
        let {query,pageQuery} = QueryParamUtil.getQueryParamsPartFields(req,["page","rows"],false);
        let result = await backgroundCaseService.findByPageOfBase(pageQuery.page,pageQuery.rows,query,'createTime');

        res.send(result);
    }
    catch (e)
    {
        console.log(e);
        res.send(new PageUtil());
    }
    res.end();
});

router.post("/insert",async function(req, res, next){
    try
    {
        //获取请求的内容对象
        let queryParam = QueryParamUtil.getQueryParamsMayHasEmpty(req,false);

        let result = await backgroundCaseService.addOfBase(queryParam);

        ResponseUtil.returnResponseSuccess(res,"添加成功");
    }
    catch (e)
    {
        console.log(e);
        ResponseUtil.returnResponseErr(res,"添加失败",e);
    }
});

router.post("/update",async function(req, res, next){
    try
    {
        //获取请求的内容对象
        let queryParam = QueryParamUtil.getQueryParamsMayHasEmpty(req,true);
        let result = await backgroundCaseService.editByIdOfBase(queryParam);

        ResponseUtil.returnResponseSuccess(res,"编辑成功");
    }
    catch(e)
    {
        console.log(e);
        ResponseUtil.returnResponseErr(res,"编辑失败",e);
    }
});

router.post("/delete",async function(req, res, next){
    try {
        //获取请求的内容对象
        let queryParam = await QueryParamUtil.getQueryParamsMayHasEmpty(req, true);

        let result = backgroundCaseService.deleteByIdOfBase(JSON.parse(queryParam.idArray));

        ResponseUtil.returnResponseSuccess(res,"删除成功");
    }
    catch(e)
    {
        console.log(e);
        ResponseUtil.returnResponseErr(res,"删除失败",e);
    }
});

router.post('/findById',async function(req,res,next){
    try
    {
        //获取请求的内容对象
        let queryParam = await QueryParamUtil.getQueryParamsMayHasEmpty(req, true);
        let entity = await backgroundCaseService.findByIdOfBase(queryParam.id);

        ResponseUtil.returnResponseSuccess(res,"删除成功",entity);
    }
    catch(e)
    {
        console.log(e);
        ResponseUtil.returnResponseErr(res,"删除失败",e);
    }
});

/**
 * 上传首图
 */
router.post('/uploadFirstFigure', upload.single('firstFigure') ,async function(req, res, next) {
    try
    {
        //获取请求的内容对象
        let queryParam = await QueryParamUtil.getQueryParamsMayHasEmpty(req, true);
        let id = queryParam.id;

        if(req.file != undefined && req.file != null)
        {
            let file = req.file;
            let uploadFile = await uploadFileService.add({
                fileName:file.originalname,
                filePath:FileCommonUtil.getRelativePath(file.path,config.upload.path),
                fileSize:file.size,
                mimeType:file.mimeType
            });

            let entity = await backgroundCaseService.findByIdOfBase(id);
            entity.firstFigure = {id:uploadFile.id,name:file.originalname};
            await entity.save();

            ResponseUtil.returnResponseSuccess(res,"上传成功",uploadFile.toObject());
        }
    }
    catch (e)
    {
        console.log(e);
        ResponseUtil.returnResponseErr(res,"上传失败",e);
    }
});
/**
 * 删除首图
 */
router.post('/deleteFirstFigure',async function(req, res, next){
    try
    {
        //获取请求的内容对象
        let queryParam = await QueryParamUtil.getQueryParamsMayHasEmpty(req, true);
        let id = queryParam.id;
        let firstFigureId = queryParam.firstFigureId;

        if(Util.isNotEmptyString(id))
        {
            let backgroundCase = await backgroundCaseService.findByIdOfBase(id);
            if( !Util.isEmpty(backgroundCase) && !Util.isEmpty(backgroundCase.firstFigure) && Util.isNotEmptyString(backgroundCase.firstFigure.id) )
            {
                uploadFileService.delete(backgroundCase.firstFigure.id);
                backgroundCase.firstFigure = null;
                backgroundCase.save();
            }
            else if(Util.isNotEmptyString(firstFigureId))
            {
                uploadFileService.delete(firstFigureId);
            }
        }
        else if(Util.isNotEmptyString(firstFigureId))
        {
            uploadFileService.delete(firstFigureId);
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
 * 上传其他图片
 */
router.post('/uploadFigures', upload.single('figures') ,async function(req, res, next) {
    try
    {
        //获取请求的内容对象
        let queryParam = await QueryParamUtil.getQueryParamsMayHasEmpty(req, true);
        let id = queryParam.id;

        if(req.file != undefined && req.file != null)
        {
            let file = req.file;
            let uploadFile = await uploadFileService.add({
                fileName:file.originalname,
                filePath:FileCommonUtil.getRelativePath(file.path,config.upload.path),
                fileSize:file.size,
                mimeType:file.mimeType
            });

            let entity = await backgroundCaseService.findByIdOfBase(id);
            entity.figures.push({id:uploadFile.id,name:file.originalname});
            await entity.save();

            ResponseUtil.returnResponseSuccess(res,"上传成功",uploadFile.toObject());
        }
    }
    catch (e)
    {
        console.log(e);
        ResponseUtil.returnResponseErr(res,"上传失败",e);
    }
});
/**
 * 删除其他图
 */
router.post('/deleteFigures',async function(req, res, next){
    try
    {
        //获取请求的内容对象
        let queryParam = await QueryParamUtil.getQueryParamsMayHasEmpty(req, true);
        let id = queryParam.id;
        let figureId = queryParam.figureId;

        if(Util.isNotEmptyString(id))
        {
            let backgroundCase = await backgroundCaseService.findByIdOfBase(id);
            if( !Util.isEmpty(backgroundCase) && Array.isArray(backgroundCase.figures) )
            {
                backgroundCase.figures = backgroundCase.figures.filter((item,index)=>{
                    if( item.id == figureId )
                    {
                        return false;
                    }
                    else
                    {
                        return true;
                    }
                });
                backgroundCase.save();
            }
        }

        if(Util.isNotEmptyString(figureId))
        {
            uploadFileService.delete(figureId);
        }

        ResponseUtil.returnResponseSuccess(res,"删除成功");
    }
    catch(e)
    {
        console.log(e);
        ResponseUtil.returnResponseErr(res,"删除失败",e);
    }
});


module.exports = router;