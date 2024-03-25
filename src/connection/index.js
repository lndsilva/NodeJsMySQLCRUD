const mysql = require('mysql2/promise')

const connection = mysql.createPool(
    {
        host: 'localhost',
        port: 3306,
        database: 'sakila',
        user: 'senacti',
        password: '123456'
    }
)
module.exports = connection