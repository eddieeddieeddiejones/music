const mysql = require('mysql')

// 1. 创建一个连接池
// 数据库的名字是hello
const pool = mysql.createPool({
  // 这里可以配置连接池中的连接对象数量
  connectionLimit: 500,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'codepackage'
})

exports.query = function(sql, params = [], callback) {
  // 2. 从连接池拿一个可用的连接
  pool.getConnection((err, connection) => {
    if (err) {
      // 这里一般就是拿不到连接对象了才会报错
      // 就是池子里的连接对象用完了
      // 数据库本身也默认有一个最大连接数
      return callback(err)
    }
    // 3. 操作数据库
    connection.query(sql, params, (err, rows) => {
      if (err) {
        return callback(err)
      }
      callback(null, rows)

      // 4. 将连接释放回连接池
      connection.release()
    })
  })
}
