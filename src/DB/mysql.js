const mysql = require('mysql');
const config = require('../config');
const e = require('express');
const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    port: config.mysql.port,
}

let connection;

function conMysql(){
    connection = mysql.createConnection(dbconfig);

    connection.connect((err) =>{
        if(err){
            console.log('[db error]',err);
            setTimeout(conMysql,200);
        }else{
            console.log('base de datos conectada')
        }
    });

    connection.on('error',err => {
        console.log('[db error]',err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            setTimeout(conMysql,200);
        }else{
            throw err;
        }
    })

}

conMysql();

function selectAll(table){
    return new Promise ((resolve,reject)=>{
        connection.query(`SELECT * FROM ${table}`,(error,result)=>{
            if(error)return reject(error);
            resolve(result);
        })
    })
}

function selectOne(table,id){

}

function add(table,data){

}

function remove(table,id){

}

module.exports={
    selectAll,
    selectOne,
    add,
    remove
}