//封装mysql
const mysql = require('mysql')
const DBConfig=require('./dbconfig');
//1.建立连接池
let pool=mysql.createPool(DBConfig);
//2.连接数据库
/* pool.getConnection(function(err, connection) {

    connection.query('SELECT * FROM my_table',  (error, results, fields) => {
      // 结束会话
      connection.release();
      // 如果有错误就抛出
      if (error) throw error;
    })
 */
    let allSqlAction = function(sql){
        pool.getConnection(function(err,connection){
            if (err) {
                //数据库连接有问题
                console.log(err)
                reject(err)
                return null;
            }else {
                //数据库连接成功
                console.log("数据库连接成功");
                connection.query(sql,(err,results)=>{
                    if (err){
                        //数据库查询出错
                        console.log("数据库中不存在对应记录");
                        reject(err)
                    }else{
                        console.log("mysql.js:数据库处理结果："+results);
                        connection.release();//释放连接
                        return results;//结果回调 
                    } 
                })
            }    
        })
    /* return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
        if (err) {
            //数据库连接有问题
            console.log(err)
            reject(err)
        }else {
            //数据库连接成功
            console.log("数据库连接成功")
            connection.query(sql, value, (err, results) => {
            if (err){
                //数据库查询出错
                console.log("数据库中不存在对应记录");
                reject(err)
            }else{
                console.log("数据库查询成功！");
                console.log("数据库查询结果："+results);
                resolve(results)
        } 
    connection.release()
    })
    }
    })
    }) */
   }   
  
module.exports = {
    allSqlAction
   }   



/* const mysql = require('mysql')
let pools = {}//连接池
let query = (sql, callback, host = '127.0.0.1') => {
    if (!pools.hasOwnProperty(host)) {//是否存在连接池
        pools[host] = mysql.createPool({//不存在创建
            host: host,
            port: '3306',
            user: 'root',
            password: '',
            database: 'test'//数据库名
        })
    }
    pools[host].getConnection((err, connection) => {//初始化连接池
        connection.query(sql, (err, results) => {//去数据库查询数据
            callback(err, results)//结果回调
            connection.release()//释放连接资源 | 跟 connection.destroy() 不同，它是销毁
        })
    })
}

module.exports = database*/