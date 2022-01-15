var express = require('express');
var app = express()
var db = require('./database')


var port = 8080;

app.listen(port,()=>{
    console.log(`server runing on port ${port}`)
})

app.get('/',(req,res,next)=>{
    res.json({"message":"oki doki"})
});

app.get('/api/users',(req,res,next)=>{
    var sql = 'SELECT * FROM users;'
    var params = []
    db.all(sql,params,(err,rows)=>{
        if(err){
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    })
})

app.use((req,res)=>{
    res.status(404)
}
)
