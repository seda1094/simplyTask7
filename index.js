const tasks = [
    {
        id: 1,
        title: "Shop",
        instruction: "lorem lorem",
        done: true
    },
    {
        id: 2,
        title: "Play",
        instrucyions: "lorem lorem",
        done: false
    },
    {
        id: 3,
        title: "Code",
        instrucyions: "lorem lorem",
        done: true
    }
];

const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const uniqid = require("uniqid");
const mongoose = require("mongoose");
const Task = require("./models/task");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => {
    res.render("index", {});
});
app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();

        res.render("tasks", {
            tasks: tasks
        });
    } catch (e) {
        console.log(e);
    }
});
// app.get('/tasks/:id',(req,res)=>{
//     res.render('task',{})
// })
app.post("/tasks/add", async (req, res) => {
    const task = Task({
        title: req.body.title,
        instruction: req.body.instruction,
        done: false
    });
    try {
        await task.save()
        res.redirect("/tasks");
    } catch (e) {
        console.log(e);
    }
});


app.post("/tasks/edit/", async (req, res) => {
    try {
        console.log("hello"); 
    }
    catch (e) {
        console.log(e);
    }
});

app.get("/tasks/edit/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        res.render("task-edit", {
            tasks: task
        });
    }
    catch (e) {
        console.log(e);
    }
});


app.get("/tasks/delete/:id", async (req, res) => {
    try {
        await Task.deleteOne({
            _id: req.params.id
        })

        res.redirect("/tasks");
    } catch (error) {
        console.log(error);
    }
});

async function start(params) {
    const url = "mongodb+srv://seda1094:aaaa@cluster0-vzrkd.mongodb.net/todo";
    const PORT = process.env.PORT || 3000;

    try {
        await mongoose.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false
        });
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();
