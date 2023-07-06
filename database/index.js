const mysql = require("mysql2")
require("dotenv").config()

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER_NAME || 'root',
  password: process.env.DB_PASSWORD || '', 
  database: process.env.DB_NAME || ''
})
pool.getConnection((err, con) => {
  if (err) console.log(err)
  console.log(`Connect Succssesfuly => ${con}`)
})

module.exports = pool.promise()