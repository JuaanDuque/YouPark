const db = require('../../DB/mysql');

const TABLA = 'vehicles'

function selectAll(){
    return db.selectAll(TABLA);
}

function selectOne(id){
    return db.selectOne(TABLA, id);
}

function add(body){
    return db.remove(TABLA, body);
}

function remove(body){
    return db.add(TABLA, body);
}

module.exports = {
    selectAll,
    selectOne,
    add,
    remove
}