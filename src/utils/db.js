/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-12-23 13:30:34
 * @LastEditTime: 2021-12-23 14:59:19
 * @LastEditors: zaq
 * @Reference: 
 */
const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost', // 连接的服务期（上线后需要改为内网的ip）
  port: 3306,
  database: 'user_info',// 选择的库
  user: 'root',
  password: 'zhuaiquan'
})

function query(sql, cb) {
  pool.getConnection((err, connection) => {
    connection.query(sql, (errors, rows) => {
      cb(errors, rows);
      connection.release();
    })
  })
}

exports.query = query;