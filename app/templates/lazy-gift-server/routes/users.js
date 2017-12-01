const express = require('express');
const router = express.Router();
//导入mysql模块
const mysql = require('mysql');
const dbConfig = require('../db/dbConfig');
const userSQL = require('../db/userSQL');

//导入 util
const DbUtil = require('../utils/DbUtil');
const routerMiddle = require('../utils/RouterUtil').routerMiddle();

const pool = mysql.createPool(dbConfig.mysql);

let dbUtil = new DbUtil();



router.get('/login', function (req, res, next) {
  res.render('login')
  //res.send('login');
});

router.post('/login', function (req, res, next) {
  let paramStr = new Buffer(req.body.p, 'base64').toString();//Base64解码,结果为：{"username":"qzsang","password":"123456"}
  let param = JSON.parse(paramStr);//Json 字符串转为对象
  let userName = param.username;
  let userPwd = param.userpwd;
  let results = {};

  //缺少参数
  if (userName == undefined || userPwd == undefined || userName == "" || userPwd == "") {
    results.code = 2;
    results.errorMsg = "缺少参数";
    res.send(results);
  } else {
    pool.getConnection(function (err, connection) {
      connection.query(userSQL.selectUserOne, userName, function (err, result) {
        if (result.length != 0) {
          if (result[0].pwd == userPwd) {
            results.code = 200;
            data = {
              "username": userName,
              "userid": result[0].id
            };
            results.data = new Buffer(JSON.stringify(data)).toString('base64');
          } else {
            results.code = 4;
            results.errorMsg = "用户名或密码错误";
          }
        } else {
          results.code = 3;
          results.errorMsg = "用户名不存在";
        }

        res.send(results);
        console.log()
        connection.release(); // 释放连接

      });
    });
  }
});

router.get('/regist', function (req, res, next) {
  res.render('regist');
});

router.post('/regist', function (req, res) {
  let paramStr = new Buffer(req.body.p, 'base64').toString();//Base64解码,结果为：{"username":"qzsang","password":"123456"}
  let param = JSON.parse(paramStr);//Json 字符串转为对象
  let name = param.username;
  let pwd = param.userpwd;
  let results = {};
  console.log('param:' + paramStr);
  pool.getConnection(function (err, connection) {
    connection.query(userSQL.selectUserOne, name, function (err, result) {
      if (result.length != 0) { //用户名已存在
        results.code = 3;
        results.errorMsg = "用户名已存在";
        res.send(results);

      } else {
        connection.query(userSQL.insertUserOne, [name, pwd], function (err, result) {
          results.code = 200;
          data = {
            "username": name,
            "userid": result.insertId
          };
          results.data = new Buffer(JSON.stringify(data)).toString('base64');
          res.send(results);

        })
      }
      connection.release();

    });

  })
});


router.post('/messageComment.json', function (req, res) {
  let param = req.p,
    userId = param.userId,
    results = {};
  dbUtil.query(userSQL.selectMyMessage, userId, function (result) {
    results.result = [];
    var callback = new commonUtil.AsyncCallback(result.length, function () {
      res.send(results);
    });
    console.log()
    result.forEach(function (item, index) {
      if (item.target_able_id == 1) {
        console.log(1111);
        dbUtil.query(userSQL.selectMessageComment, [item.detail_id, userId], function (result) {
          results.result.push(result);
        });
      }
    });

    callback.exect();

  })
});

module.exports = router;
