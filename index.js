const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/',(req,res)=>{
    res.send("hello")
})
app.get('/tasks',(req,res)=>{
    res.send("/tasks")
})
app.get('/tasks/:id',(req,res)=>{
    res.send("/task/:id")
})
app.post('/tasks/add',(req,res)=>{
    res.send('/tasks/add')
})
app.post('/tasks/:id/edit',(req,res)=>{
    res.send("/tasks/:id/edit")
})
app.post('/tasks/delete',(req,res)=>{
    res.send("/tasks/delet")
})

app.listen(3000, ()=>{
    console.log("You are connected!!!");
})