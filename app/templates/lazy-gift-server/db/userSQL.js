/**
 * Created by apple on 2017/9/23.
 */

let UserSQL = {
    selectUserAll:'select * from user',
    selectUserOne:'select * from user where name = ?',
    insertUserOne:'insert into user(name,pwd) values(?,?)',

    selectMyMessage: 'SELECT * FROM my_message WHERE user_id=? ORDER BY date ASC',

    selectMessageComment: 'SELECT a.*,b.name AS owner_user_name,b.header_url as owner_user_headerUrl,c.`name` as target_user_name,c.header_url as target_user_headerUrl,d.date,d.content  FROM message_comment as a INNER JOIN `user` AS b ON a.owner_user_id=b.id INNER JOIN `user` AS c ON a.target_user_id=c.id LEFT JOIN `comment` AS d ON a.detail_id=d.detail_id AND a.owner_user_id=d.owner_user_id WHERE a.detail_id=? AND a.target_user_id=?'


};


module.exports = UserSQL;
