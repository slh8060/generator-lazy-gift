let GiftSQL = {
  selectDetailAll: 'SELECT a.*,(a.date) as date,' +
  'c.name,c.header_url ' +
  'FROM detail as a ' +
  'inner JOIN `user` as c on a.user_id=c.id ' +
  'where a.date < ? ORDER BY a.id DESC limit ?,?',

  selectDetailOne: 'SELECT a.*,b.name,b.header_url FROM detail as a INNER JOIN `user` as b on a.user_id = b.id WHERE a.id=?',

  selectDetailItem: 'SELECT * FROM detail_item WHERE detail_id=? ORDER BY detail_level',

  selectDetailOneIsApprove: 'SELECT is_approve FROM approve WHERE detail_id=? AND user_id=?',
  //selectDetailOneIsApprove: 'SELECT a.*,b.name,b.header_url,c.is_Approve FROM detail as a INNER JOIN `user` as b on a.user_id = b.id INNER JOIN Approve as c on a.id=c.detail_id AND a.user_id=c.user_id WHERE a.id=?',

  insertDetailOne:'INSERT INTO detail(user_id,title,date) VALUES(?,?,?)',

  insertDetailItem: 'INSERT INTO detail_item(detail_id,brief,detail_level,content) VALUES(?,?,?,?)',

  updateDetailApprove: 'UPDATE approve SET is_approve=? WHERE user_id=? AND detail_id=?',

  insertDetailApprove: 'INSERT INTO approve(user_id,detail_id,is_approve) VALUES(?,?,?)',

  selectCollectOne: 'SELECT * FROM collect WHERE user_id=? AND detail_id=?',

  selectCollectAll: 'SELECT * FROM collect WHERE user_id=?',

  insertCollectOne: 'INSERT INTO collect(user_id,detail_id) VALUES(?,?)',

  deleteCollectone: 'DELETE FROM collect WHERE user_id=? AND detail_id=?',



};

module.exports = GiftSQL;
