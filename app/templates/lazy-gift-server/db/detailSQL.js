let DetailSQL = {
  selectDetailAll: 'SELECT a.id,a.title,unix_timestamp(a.date) as date,a.interest_count, a.uninterest_count,' +
  'c.name,c.header_url ' +
  'FROM detail as a ' +
  'inner JOIN `user` as c on a.user_id=c.id ' +
  'where a.date < ? ORDER BY a.id DESC limit ?,?',

  selectDetailOne: 'SELECT a.*,b.name,b.header_url FROM detail as a INNER JOIN `user` as b on a.user_id = b.id WHERE a.id=?',

  selectDetailItem: 'SELECT * FROM detail_item WHERE detail_id=? ORDER BY detail_level',

  insertDetailOne:'INSERT INTO detail(user_id,title,date) VALUES(?,?,?)',

  insertDetailItem: 'INSERT INTO detail_item(detail_id,brief,detail_level,content) VALUES(?,?,?,?)'
};

module.exports = DetailSQL;
