const TABLA = 'vehicles'

module.exports = function(dbinyectada){

    let db = dbinyectada;

    if(!db){
        db = require('../../DB/mysql')
    }

    function selectAll(){
        return db.selectAll(TABLA);
    }
    
    function selectOne(id){
        return db.selectOne(TABLA, id);
    }
    
    function add(body){
        return db.add(TABLA, body);
    }
    
    function remove(body){
        return db.remove(TABLA, body);
    }

    return{
        selectAll,
        selectOne,
        add,
        remove
    }
}