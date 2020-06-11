import path from 'path'

module.exports = {
     client: 'mysql',
     connection: {
        host : 'localhost',
        user : 'root',
        password : '123456',
        database : 'db_ecoleta'
      },
      migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
      },
      seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
      },
      useNullAsDefault: true
 }