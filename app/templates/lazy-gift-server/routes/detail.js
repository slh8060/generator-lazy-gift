const express = require('express');
const router = express.Router();
//导入mysql模块
const mysql = require('mysql');
const dbConfig = require('../db/dbConfig');
const detailSQL = require('../db/detailSQL');
const userSQL = require('../db/userSQL');

// 使用DBConfig.js的配置信息创建一个MySQL连接池
const pool = mysql.createPool(dbConfig.mysql);

//详情
router.get('/detail.json', function (req, res, next) {
  res.render('detail')
});

router.post('/detail.json', function (req,res) {
  let param = JSON.parse(req.body.p);
  let detailId = param.detailId;
  let results = {};

  pool.getConnection(function (err,connection) {
    connection.query(detailSQL.selectDetailOne,detailId,function (err,result) {
      if (err) {
        results.success = false;
        results.message = err.message;
      } else {
        results.success = true;
        results.result = result;
        results.result[0].items = [];
        connection.query(detailSQL.selectDetailItem,detailId,function (err,result) {
          let items = [];
          for (let i = 0; i < result.length; i ++){
            let item = {};
            item.detail_level = result[i].detail_level;
            item.brief = result[i].brief;
            item.content = result[i].content;
            items.push(item);
          }
          results.result[0].items = items;
          res.send(results);
        });
      }
      connection.release();
    })
  })
});




//推荐
router.get('/recommend.json', function (req, res, next) {
  res.render('recommend')
});

router.post('/recommend.json', function (req, res) {
  let param = JSON.parse(req.body.p);
  let start = param.start;
  let limit = param.limit;
  let firstTime;
  let results = {};

  if (typeof param.firstTime != "undefined") {
    firstTime = param.firstTime;
  } else {
    firstTime = new Date();
  }
  pool.getConnection(function (err,connection) {
    connection.query(detailSQL.selectDetailAll,[firstTime,(start-1)*limit,limit],function (err,result) {
      if (err) {
        results.success = false;
        results.message = err.message;
        res.send(results);
      } else {

        if (result.length == 0) {
          results.cuccess = false;
          results.message = "没有更多数据";
          res.send(results);
        } else {
          results.success = true;
          results.firstTime = firstTime;
          results.result = result;

          var callback = new AsyncCallback(result.length,function () {
            res.send(results);
            connection.release();
          });

          for (let i = 0; i < result.length; i ++){
            let items = [];
            connection.query(detailSQL.selectDetailItem,result[i].id,function (err,result) {
              if (result.length != 0) {
                for (let j = 0; j < result.length; j ++){
                  let item = {};
                  item.detail_level = result[j].detail_level;
                  item.brief = result[j].brief;
                  item.content = result[j].content;
                  items.push(item);
                }
                results.result[i].items = items;
              } else {
                results.result[i].items = [];
              }
              callback.exect();
            });
          }
        }
      }
    })
  });

});

class AsyncCallback {
  constructor(count, callback) {
    this.count = count;
    this.realCallback = callback;
    if (count == 0) {
      callback();
    }
  }


  exect() {
    this.count--;
    if (this.count == 0) {
      this.realCallback();
    }
  }

}

//发布
router.post('/publish.json', function (req, res) {
  let param = JSON.parse(req.body.p);
  let items = param.items;
  var i = 1;
  let results = {};

  pool.getConnection(function (err, connection) {
    connection.query(userSQL.selectUserOne, param.uname, function (err, result) {
      if (err) {
        results.success = false;
        results.message = err.message;
      } else {
        connection.query(detailSQL.insertDetailOne, [result[0].id, param.title, new Date()], function (err, result) {
          if (err) {
            results.success = false;
            results.message = err.message;
          } else {
            for (let i = 0; i < items.length; i++) {
              connection.query(detailSQL.insertDetailItem, [result.insertId, items[i].brief, items[i].detail_level, items[i].content], function (err, result) {
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
