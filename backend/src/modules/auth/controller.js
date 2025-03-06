const TABLA = 'auth'
const bcrypt = require('bcrypt');
const authentication = require('../../authentication');
module.exports = function(dbinyectada){

    let db = dbinyectada;

    if(!db){
        db = require('../../DB/mysql')
    }

    async function login(id,password){
        const data = await db.query(TABLA,{id: id});
        return bcrypt.compare(password,data[0].password).then(result => {
            if(result === true){
                //generar token
                return authentication.assignToken({ ...data});
            }else{
                throw new Error('Información invalida.');
            }
        })
    }

    async function add(data){
        const authData={
            id: data.id,
        }

        if(data.user){
            authData.user = data.user
        }

        if(data.password){
            authData.password = await bcrypt.hash(data.password.toString(), 5)
        }

        return db.add(TABLA, authData);
    }

    return{
        add,
        login
    }
}