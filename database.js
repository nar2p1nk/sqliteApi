const sqlite = require('sqlite3')

const db = new sqlite.Database('todo.db',(err)=>{
    if(err){
        return console.error(err.message)
    }
})
module.exports = db
