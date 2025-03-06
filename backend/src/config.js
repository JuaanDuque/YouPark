require('dotenv').config();

module.exports = {
    app: {
        port:process.env.PORT || 4000
    },
    jwt:{
        secret: process.env.JET_SECRET || 'notasecreta!'
    },
    mysql:{
        host:process.env.MYSQL_HOST,
        user:process.env.MYSQL_USER,
        password:process.env.MYSQL_PASSWORD,
        database:process.env.MYSQL_DB,
        port: process.env.MYSQL_DB_PORT,
    }
}