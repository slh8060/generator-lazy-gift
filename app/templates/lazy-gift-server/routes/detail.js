const express = require('express');
const router = express.Router();
//导入mysql模块
const mysql = require('mysql');
const dbConfig = require('../db/dbConfig');
const detailSQL = require('../db/detailSQL');
const userSQL = require('../db/userSQL');

// 使用DBConfig.js的配置信息创建一个MySQL连接池
const pool = mysql.createPool(dbConfig.mysql);



router.get('/detail.json',function (req,res,next) {
  /*let username = req.query.username;
  res.send(username);
  let results = {};
  pool.getConnection(function (err,connection) {
    connection.query(giftSQL.selectGiftInfo,function (err,result) {
      res.send(result);
    })
  });*/
  res.render('detail')
});

router.post('/detail.json',function (req,res) {
  let param = JSON.parse(req.body.p);
  let start = param.start;
  let limit = param.limit;

  pool.getConnection(function (err,connection) {
    connection.query(detailSQL.selectDetailAll,[(start-1) * limit,limit],function (err,result) {
      results = result;
      res.send(results);
    })
  });
});

router.post('/publish.json',function (req,res) {
  let param = JSON.parse(req.body.p);
  let items = param.items;
  var i = 1;
  let results = {};

  pool.getConnection(function (err,connection) {
    connection.query(userSQL.selectUserOne,param.uname,function (err,result) {
     if (err) {
       results.success = false;
       results.message = err.message;
     } else {
       connection.query(detailSQL.insertDetailOne,[result[0].id,param.title,new Date()],function (err,result) {
         if (err) {
           results.success = false;
           results.message = err.message;
         } else {
           for (let i = 0; i < items.length; i ++){
             connection.query(detailSQL.insertDetailItem,[result.insertId,param.title,items[i].detail_level,items[i].content],function (err,result) {
               if (err) {
                 results.success = false;
                 results.message = err.message;
               }
             });
           }
           results.success = true;
           res.send(results);
         }
       })
     }
      connection.release();
    });
  })


});

module.exports = router;
