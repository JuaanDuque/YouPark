const db = require('../../DB/mysql');

const TABLA = 'vehicles'

function selectAll(){
    return db.selectAll(TABLA);
}

module.exports = {
    selectAll
}