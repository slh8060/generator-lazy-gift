/**
 * Created by apple on 2017/9/23.
 */

let UserSQL = {
    selectUserAll:'select * from user',
    selectUserOne:'select * from user where name = ?',
    insertUserOne:'insert into user(name,pwd) values(?,?)'
};


module.exports = UserSQL;
