const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine','pug')
app.set('views', './views')



app.get('/',(req,res)=>{
    res.render('index',{})
})
app.get('/tasks',(req,res)=>{
    res.render('tasks',{})
})
app.get('/tasks/:id',(req,res)=>{
    res.render('task',{})
})
app.post('/tasks/add',(req,res)=>{
    //some code
    res.redirect('/tasks')
})
app.post('/tasks/:id/edit',(req,res)=>{
    res.render('task-edit',{})
})
app.post('/tasks/delete',(req,res)=>{
    //some code
    res.redirect('/tasks')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log("You are connected!!!");
})