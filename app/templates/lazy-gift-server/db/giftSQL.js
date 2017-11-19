let GiftSQL = {
  selectDetailAll: 'SELECT a.*,unix_timestamp(a.date) as date,' +
  'c.name,c.header_url ' +
  'FROM detail as a ' +
  'inner JOIN `user` as c on a.user_id=c.id ' +
  'where a.date < ? ORDER BY a.id DESC limit ?,?',

  selectDetailOne: 'SELECT a.*,b.name,b.header_url FROM detail as a INNER JOIN `user` as b on a.user_id = b.id WHERE a.id=?',

  selectDetailItem: 'SELECT * FROM detail_item WHERE detail_id=? ORDER BY detail_level',

  selectDetailOneIsinterest: 'SELECT is_approve FROM approve WHERE detail_id=? AND user_id=?',
  //selectDetailOneIsinterest: 'SELECT a.*,b.name,b.header_url,c.is_interest FROM detail as a INNER JOIN `user` as b on a.user_id = b.id INNER JOIN interest as c on a.id=c.detail_id AND a.user_id=c.user_id WHERE a.id=?',

  insertDetailOne:'INSERT INTO detail(user_id,title,date) VALUES(?,?,?)',

  insertDetailItem: 'INSERT INTO detail_item(detail_id,brief,detail_level,content) VALUES(?,?,?,?)',

  updateDetailInterest: 'DELETE FROM approve WHERE user_id=5 AND detail_id=50',

  insertDetailInterest: 'INSERT INTO approve(user_id,detail_id,is_approve) VALUES(?,?,?)',

  insertCollectOne: 'INSERT INTO collect(user_id,detail_id) VALUES(?,?)',

  deleteCollectone: 'DELETE FROM collect WHERE user_id=? AND detail_id=?'
};

module.exports = GiftSQL;
