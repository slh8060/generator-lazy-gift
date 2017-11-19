const express = require('express');
const router = express.Router();



// router.get('/gift.json', function (req, res, next) {
//   res.send('11231');
// });

// router.get('/gift.json', getFunction(function (req, res) {
//   res.send('routerFunction');
// }));




function getFunction(callback) {

  return function (req, res, next) {

    callback(req, res);
  };
}


function postFunction(callback) {

  return function (req, res, next) {
    let param = JSON.parse(req.body.p);
    callback(param, res);
  };
}


module.exports = {
  postFunction: postFunction,
  getFunction: getFunction
};
// module.exports = router;

