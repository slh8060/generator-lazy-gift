const express = require('express');
const router = express.Router();
//导入mysql模块
const mysql = require('mysql');
const dbConfig = require('../db/dbConfig');
const giftSQL = require('../db/giftSQL');
const userSQL = require('../db/userSQL');
const DbUtil = require('../utils/DbUtil');
const pool = mysql.createPool(dbConfig.mysql);

let dbUtil = new DbUtil();


router.get('/gift.json', function (req, res, next) {
  res.render('gift')
});

//详情
router.post('/detail.json', function (req, res) {
  let param = JSON.parse(req.body.p);
  let detailId = param.detailId,
    userId = param.userId,
    results = {};

  dbUtil.query(giftSQL.selectDetailOne, detailId, function (result) {
    results.success = true;
    results.result = result;
    results.result[0].items = [];
    //throw new Error("999");
    dbUtil.query(giftSQL.selectDetailItem, detailId, function (result) {
      let items = [];
      for (let i = 0; i < result.length; i++) {
        let item = {};
        item.detail_level = result[i].detail_level;
        item.brief = result[i].brief;
        item.content = result[i].content;
        items.push(item);
      }
      results.result[0].items = items;
      if (typeof userId != "undefined") {
        dbUtil.query(giftSQL.selectDetailOneIsinterest, [detailId, userId], function (result) {
          results.result[0].is_approve = result[0].is_approve;
          res.send(results);
        })
      } else {
        results.result[0].is_approve = 0;
        res.send(results);
      }
    });
  });
  dbUtil.release();

  // pool.getConnection(function (err, connection) {
  //   query(connection, giftSQL.selectDetailOne, detailId).then(result => {
  //     results.success = true;
  //     results.result = result;
  //     results.result[0].items = [];
  //     query(connection, giftSQL.selectDetailItem, detailId).then(result => {
  //       let items = [];
  //       for (let i = 0; i < result.length; i++) {
  //         let item = {};
  //         item.detail_level = result[i].detail_level;
  //         item.brief = result[i].brief;
  //         item.content = result[i].content;
  //         items.push(item);
  //       }
  //       results.result[0].items = items;
  //       if (typeof userId != "undefined") {
  //         query(connection, giftSQL.selectDetailOneIsinterest, [detailId, userId]).then(result => {
  //           results.result[0].is_approve = result[0].is_approve;
  //           res.send(results);
  //           connection.release();
  //         })
  //       } else {
  //         results.result[0].is_approve = 0;
  //         res.send(results);
  //         connection.release();
  //       }
  //     });
  //   }).catch(err => {
  //     results.success = false;
  //     results.message = err.message;
  //     res.send(results);
  //     connection.release();
  //
  //   })
  // });

  // pool.getConnection(function (err, connection) {
  //   connection.query(giftSQL.selectDetailOne, detailId, function (err, result) {
  //     if (err) {
  //       results.success = false;
  //       results.message = err.message;
  //     } else {
  //       results.success = true;
  //       results.result = result;
  //       results.result[0].items = [];
  //       connection.query(giftSQL.selectDetailItem, detailId, function (err, result) {
  //         let items = [];
  //         for (let i = 0; i < result.length; i++) {
  //           let item = {};
  //           item.detail_level = result[i].detail_level;
  //           item.brief = result[i].brief;
  //           item.content = result[i].content;
  //           items.push(item);
  //         }
  //         results.result[0].items = items;
  //
  //         if (typeof userId != "undefined") {
  //           connection.query(giftSQL.selectDetailOneIsinterest,[detailId, userId],function (err,result) {
  //             results.result[0].is_approve = result[0].is_approve;
  //             res.send(results);
  //           })
  //         } else {
  //           results.result[0].is_approve = 0;
  //           res.send(results);
  //         }
  //       });
  //     }
  //     connection.release();
  //   })
  // })
});

//推荐
router.post('/recommend.json', function (req, res) {
  let param = JSON.parse(req.body.p),
    start = param.start,
    limit = param.limit,
    userId = param.userId,
    firstTime, results = {};


  if (typeof param.firstTime != "undefined") {
    firstTime = param.firstTime;
  } else {
    firstTime = new Date();
  }
  dbUtil.query(giftSQL.selectDetailAll, [firstTime, (start - 1) * limit, limit], function (result) {
    if (result.length == 0) {
      results.success = false;
      results.message = "没有更多数据";
      res.send(results);
    } else {
      results.success = true;
      results.firstTime = firstTime;
      results.result = result;
      var callback = new AsyncCallback(result.length, function () {
        res.send(results);
      });
      for (let i = 0; i < result.length; i++) {
        let items = [];
        let detailId = result[i].id;
        dbUtil.query(giftSQL.selectDetailItem, result[i].id, function (result) {
          if (result.length != 0) {
            for (let j = 0; j < result.length; j++) {
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

          if (typeof userId != "undefined") {
            dbUtil.query(giftSQL.selectDetailOneIsinterest, [detailId, userId], function (result) {
              if (result.length != 0) {
                results.result[i].is_approve = result[0].is_approve;
              } else {
                results.result[i].is_approve = 0;
              }
              callback.exect();
            })
          } else {
            results.result[i].is_approve = 0;
            res.send(results);
            callback.exect();
          }

        });
      }
    }
  });
  dbUtil.release();


  // pool.getConnection(function (err, connection) {
  //   connection.query(giftSQL.selectDetailAll, [firstTime, (start - 1) * limit, limit], function (err, result) {
  //     if (err) {
  //       results.success = false;
  //       results.message = err.message;
  //       res.send(results);
  //     } else {
  //
  //       if (result.length == 0) {
  //         results.cuccess = false;
  //         results.message = "没有更多数据";
  //         res.send(results);
  //       } else {
  //         results.success = true;
  //         results.firstTime = firstTime;
  //         results.result = result;
  //
  //         var callback = new AsyncCallback(result.length, function () {
  //           res.send(results);
  //           connection.release();
  //         });
  //
  //         for (let i = 0; i < result.length; i++) {
  //           let items = [];
  //           connection.query(giftSQL.selectDetailItem, result[i].id, function (err, result) {
  //             if (result.length != 0) {
  //               for (let j = 0; j < result.length; j++) {
  //                 let item = {};
  //                 item.detail_level = result[j].detail_level;
  //                 item.brief = result[j].brief;
  //                 item.content = result[j].content;
  //                 items.push(item);
  //               }
  //               results.result[i].items = items;
  //
  //               if (typeof userId != 'undefined') {
  //                 connection.query(giftSQL.selectDetailOneIsinterest, [result[i].id, userId], function (err, result) {
  //                   console.log('------', result);
  //                   console.log(result.is_approve);
  //                   // results.result[i].is_approve = result[0].is_approve;
  //                 })
  //               } else {
  //                 results.result[i].is_approve = 0;
  //               }
  //             } else {
  //               results.result[i].items = [];
  //             }
  //             callback.exect();
  //           });
  //         }
  //       }
  //     }
  //   })
  // });
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
  dbUtil.query(userSQL.selectUserOne, param.uname, function (result) {
    dbUtil.query(giftSQL.insertDetailOne, [result[0].id, param.title, new Date()], function (result) {
      results.detailId = result.insertId;
      var callback = new AsyncCallback(items.length, function () {
        res.send(results);
      });
      for (let i = 0; i < items.length; i++) {
        dbUtil.query(giftSQL.insertDetailItem, [result.insertId, items[i].brief, items[i].detail_level, items[i].content], function (result) {
          results.success = true;
          callback.exect();
        });
      }
    })
  });
  dbUtil.release();
  // pool.getConnection(function (err, connection) {
  //   connection.query(userSQL.selectUserOne, param.uname, function (err, result) {
  //     if (err) {
  //       results.success = false;
  //       results.message = err.message;
  //     } else {
  //       connection.query(giftSQL.insertDetailOne, [result[0].id, param.title, new Date()], function (err, result) {
  //         if (err) {
  //           results.success = false;
  //           results.message = err.message;
  //         } else {
  //           for (let i = 0; i < items.length; i++) {
  //             connection.query(giftSQL.insertDetailItem, [result.insertId, items[i].brief, items[i].detail_level, items[i].content], function (err, result) {
  //               if (err) {
  //                 results.success = false;
  //                 results.message = err.message;
  //               }
  //             });
  //           }
  //           results.success = true;
  //           res.send(results);
  //         }
  //       })
  //     }
  //     connection.release();
  //   });
  // })


});


//收藏\取消收藏
router.post('/approve.json', function (req, res) {
  let param = JSON.parse(req.body.p);
  let userId = param.userId,
    detailId = param.detailId,
    is_approve = param.is_approve,
    results = {};



  pool.getConnection(function (err, connection) {


    connection.query(giftSQL.updateDetailInterest, [is_approve, userId, detailId], function (err, result) {
      if (err) {
        results.success = false;
        results.message = err.message;
      } else {
        if (is_approve == 1) {
          connection.query(giftSQL.insertCollectOne, [userId, detailId], function (err, result) {
            if (!err) {
              results.success = true;
              res.send(results);
            }
          })
        } else {
          connection.query(giftSQL.deleteCollectone, [userId, detailId], function (err, result) {
            if (!err) {
              results.success = true;
              res.send(results);
            }
          })
        }
      }
    })
  });
});

//收藏列表接口
router.post('/collect.json', function (req, res) {
  let param = JSON.parse(req.body.p);
  let userId = param.userId;

  pool.getConnection(function (err, connection) {
    connection.query()
  });
});


module.exports = router;
