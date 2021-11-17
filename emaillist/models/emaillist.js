const mysql = require('mysql2');
const dbconn = require('./dbconn');
const util = require('util');

module.exports = {
    findAll: async function(callback){   // awiat 해서 async 달아줫다.
     
        const conn = dbconn();

    // 이거 이해 잘하쟈    
    // const query = function(sql, data) {
        //     return new Promise(function(resolve, reject){
        //         conn.query(sql, [], function(error, results, field){
        //             return error ? reject(error) : resolve(results);
        //         })
        //     })
        // }

    // 미친짓~~~ 
    // const query = (sql, data) => new Promise((resolve, reject) => conn.query(sql, [], (error, results, field) => (error ? reject(error) : resolve(results))))
    
    const query = util.promisify(conn.query).bind(conn); 
    
    try{
    return await query('select no, first_name as firstName, last_name as lastName, email from emaillist order by no desc', 
    []);  // 바인딩해야할 데이터
    } catch(e){
        console.error(e);
      } finally{
          conn.end();
      }
    // return await conn.query(sql,[]);

    },
    insert: async function(emaillist){
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn); 

        try{
            return await query('insert into emaillist(first_name, last_name, email) values(?, ?, ?)',
             Object.values(emaillist)  // 배열로 만들어준다.
             );
            } catch(e){
                console.error(e);
              } finally{
                  conn.end();
              }
    }
}