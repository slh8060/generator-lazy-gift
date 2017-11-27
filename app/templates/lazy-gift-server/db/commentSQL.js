let CommentSQL = {
  insertCommentReply: 'INSERT INTO `comment`(detail_id,owner_user_id,target_user_id,parent_id,content) VALUES(?,?,?,?,?)',  //回复

  insertComment: 'INSERT INTO `comment`(detail_id,owner_user_id,content) VALUES(?,?,?)',  //评论

  selectComment: 'SELECT a.*,unix_timestamp(a.date) as date,b.`name` FROM `comment` as a INNER JOIN `user` as b ON a.owner_user_id=b.id WHERE detail_id=? AND a.parent_id IS NULL AND a.target_user_id IS NULL',

  selectReply: 'SELECT a.*,unix_timestamp(a.date) as date,b.name as owner_user_name,c.`name` as target_user_name FROM `comment` as a INNER JOIN `user` AS b ON a.owner_user_id=b.id INNER JOIN `user` AS c ON a.target_user_id=c.id WHERE detail_id=? AND root_id=? ORDER BY date ASC'


};

module.exports = CommentSQL;
