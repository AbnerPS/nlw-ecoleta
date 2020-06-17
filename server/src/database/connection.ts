import knex from 'knex'

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