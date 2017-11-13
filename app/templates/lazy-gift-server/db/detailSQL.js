let DetailSQL = {
  selectDetailAll: 'SELECT a.title,unix_timestamp(a.date) as date,a.interest_count, a.uninterest_count,' +
  'b.detail_level,b.content,' +
  'c.name,c.header_url ' +
  'FROM detail as a ' +
  'LEFT JOIN detail_item as b ON a.id=b.detail_id ' +
  'inner JOIN `user` as c on a.user_id=c.id LIMIT ?,?',

  selectDetailOne: 'SELECT * FROM detail,`user` WHERE detail.id=`user`.id AND `user`.name=? ',

  insertDetailOne:'INSERT INTO detail(user_id,title,date) VALUES(?,?,?)',

  insertDetailItem: 'INSERT INTO detail_item(detail_id,title,detail_level,content) VALUES(?,?,?,?)'
};

module.exports = DetailSQL;
