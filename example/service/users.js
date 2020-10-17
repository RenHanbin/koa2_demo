/*用于处理与数据库之间的交互问题 */
const mysql = require('mysql');
const DBConfig = require('../util/dbconfig');
var connection = mysql.createConnection(DBConfig);
var Promise = require('promise');
// 1.用户登录
function userLogin(name, password) {
  console.log('userLogin:name=' + name + 'password=' + password);
  // 处理异步任务返回的results
  return new Promise((resolve, reject) => {
    console.log('userLogin:name=' + name + 'password=' + password);
    let sql = `select * from user where user_name = "${name}" and user_pwd="${password}"`;
    console.log('查询sql:' + sql);
    // 查询相应数据表，返回数据
    connection.query(sql, (error, results, fields) => {
      console.log('The solution is: ', results);
      if (error) {
        // 查询失败
        console.log('[query] - :' + error);
        reject(error);
      } else {
        // 查询成功
        resolve(results);
      }
    });
  });
}

// 2-1.注册验证——验证用户是否已经注册（userPhone）
function checkRegisteredByPhone(userPhone) {
  // 处理异步任务返回的results
  return new Promise((resolve, reject) => {
    let sql = `select * from user where user_phone = "${userPhone}" `;
    console.log('查询sql:' + sql);
    // 查询相应数据表，返回数据
    connection.query(sql, (error, results, fields) => {
      console.log('The solution is: ', results);
      if (error) {
        // 查询失败
        console.log('[query] - :' + error);
        reject(error);
      } else {
        // 查询成功
        resolve(results);
      }
    });
  });
}

// 2-2.注册验证——验证用户是否已经注册（userEmail）
function checkRegisteredByEmail(userEmail) {
  // 处理异步任务返回的results
  return new Promise((resolve, reject) => {
    let sql = `select * from user where user_email = "${userEmail}" `;
    console.log('查询sql:' + sql);
    // 查询相应数据表，返回数据
    connection.query(sql, (error, results, fields) => {
      console.log('The solution is: ', results);
      if (error) {
        // 查询失败
        console.log('[query] - :' + error);
        reject(error);
      } else {
        // 查询成功
        resolve(results);
      }
    });
  });
}
// 3.用户注册
function userRegister(name, password, userPhone, userEmail) {
  // 处理异步任务返回的results
  return new Promise((resolve, reject) => {
    // 进行注册
    let sql = `insert into user(user_name,user_pwd,user_phone,user_email) values("${name}","${password}","${userPhone}","${userEmail}")`;
    // 查询相应数据表，返回数据
    connection.query(sql, (error, results, fields) => {
      console.log('The solution is: ', results);
      if (error) {
        // 插入失败
        console.log('[query] - :' + error);
        reject(error);
      } else {
        // 插入成功
        resolve(results);
      }
    });
  });
}

module.exports = {
  userLogin,
  userRegister,
  checkRegisteredByPhone,
  checkRegisteredByEmail,
};
