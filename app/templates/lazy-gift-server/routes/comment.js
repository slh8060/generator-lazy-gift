const express = require('express');
const router = express.Router();
//导入mysql模块
const mysql = require('mysql');
const dbConfig = require('../db/dbConfig');
const commentSQL = require('../db/commentSQL');
//导入 util
const DbUtil = require('../utils/DbUtil');
const routerMiddle = require('../utils/RouterUtil').routerMiddle();


let dbUtil = new DbUtil();

router.use(routerMiddle);



router.get('/gift.json', function (req, res, next) {
  res.render('gift');
});

//评论
router.post('/comment.json',function (req,res) {

  let param = req.p,
    detailId = param.detailId,
    ownerUserId = param.ownerUserId,
    targetUserId = param.targetUserId,
    content = param.content,
    parentId = param.parentId,
    rerults = {};

  if (typeof targetUserId == "undefined"){  //评论
    dbUtil.query(commentSQL.insertComment,[detailId,ownerUserId,content],function (result) {
      rerults.success = true;
      rerults.ownerUserId = ownerUserId;
      rerults.commentId = result.insertId;
      res.send(rerults);
    });

  } else {   //回复
    dbUtil.query(commentSQL.insertCommentReply,[detailId,ownerUserId,targetUserId,parentId,content],function (result) {
      rerults.success = true;
      rerults.ownerUserId = ownerUserId;
      rerults.commentId = result.insertId;
      res.send(rerults);

    });
  }






});


//详情

module.exports = router;
