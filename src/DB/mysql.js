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
            return error ? reject(error) : resolve (result);
        })
    })
}

function selectOne(table,id){
    return new Promise ((resolve,reject)=>{
        connection.query(`SELECT * FROM ${table} WHERE id=${id}`,(error,result)=>{
            return error ? reject(error) : resolve (result);
        })
    })
}

function insertItem(table,data){
    return new Promise ((resolve,reject)=>{
        connection.query(`INSERT INTO ${table} SET ?`, data, (error,result)=>{
            return error ? reject(error) : resolve (result);
        })
    })
}

function updateItem(table,data){
    return new Promise ((resolve,reject)=>{
        connection.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, data.id], (error,result)=>{
            return error ? reject(error) : resolve (result);
        })
    })
}

function add(table,data){
    if(data && data.id == 0){
        return insertItem(table,data);
    }else{
        return updateItem(table,data);
    }
}

function remove(table,data){
    return new Promise ((resolve,reject)=>{
        connection.query(`DELETE FROM ${table} WHERE id = ?`, data.id, (error,result)=>{
            return error ? reject(error) : resolve (result);
        })
    })
}

module.exports={
    selectAll,
    selectOne,
    add,
    remove
}