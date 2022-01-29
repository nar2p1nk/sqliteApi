var express = require('express');
var app = express();
var db = require('./database');
var bodyParser = require('body-parser');

var port = 8080;

app.use(bodyParser.urlencoded({extended:false}))

app.get('/',(req,res,next)=>{
    res.sendFile(__dirname + '/' + 'form.html')
});

app.post('/',(req,res)=>{
    db.run(`INSERT INTO todos(todo) VALUES(?)`,[req.body.todo],(err)=>{
        if(err){res.status(400).json({'message':err.message})}
        else{res.redirect('/api/todos')}
    })
    console.log(req.body.todo)
})

app.get('/api/todos',(req,res,next)=>{
    var sql = 'SELECT * FROM todos;'
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


app.delete('/api/todos/delete/:todoId',(req,res)=>{

            req.method = 'GET';
    db.run(`DELETE FROM todos WHERE Id = ?`,[req.params.todoId],(err)=>{
        if(err){res.status(400).send(err.message)}
        else{
            res.redirect('/api/todos')
            console.log('DELETE request completed')
        }
    })
})

app.listen(port,()=>{
    console.log(`server runing on port ${port}`)
})
