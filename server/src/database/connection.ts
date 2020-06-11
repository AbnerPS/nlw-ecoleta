import knex from 'knex'
import path from 'path'

 const connection = knex({
     client: 'mysql',
     connection: {
        host : 'localhost',
        user : 'root',
        password : '123456',
        database : 'db_ecoleta'
      },
      useNullAsDefault: true
 })

 export default connection