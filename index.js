const express = require("express")
const app = express()
const path = require("path")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const moment = require("moment")
const Task = require("./models/task")

app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set("view engine", "pug")
app.set("views", "./views")

app.get("/", (req, res) => {
    res.render("index", {})
});

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find()

        res.render("tasks", {
            tasks: tasks
        });
    } catch (e) {
        console.log(e)
    }
});

app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        res.render("task", {
            task: task
        })
    }
    catch (e) {
        console.log(e)
    }
})

app.post("/tasks/add", async (req, res) => {
    const task = Task({
        title: req.body.title,
        instruction: req.body.instruction,
        done: false,
        date: moment().format('MMMM Do YYYY, h:mm:ss a')
    })
    try {
        await task.save()
        res.redirect("/tasks")
    } catch (e) {
        console.log(e)
    }
});

app.post("/tasks/edit", async (req, res) => {
    try {
        const { id } = req.body
        delete req.body.id
        const task = await Task.findById(id)
        Object.assign(task, {
            title: req.body.title,
            instruction: req.body.instruction
        })
        await task.save()
        res.redirect('/tasks')
    } catch (error) {
        console.log(error)
    }
});

app.get("/tasks/done/:id", async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findById(id)
        Object.assign(task, {
            done: !task.done,
        })
        await task.save()
        res.redirect('/tasks')
    } catch (error) {
        console.log(error)
    }
});

app.get("/tasks/edit/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        res.render("task-edit", {
            task: task
        });
    }
    catch (e) {
        console.log(e)
    }
});

app.get("/tasks/delete/:id", async (req, res) => {
    try {
        await Task.deleteOne({
            _id: req.params.id
        })
        res.redirect("/tasks")
    } catch (error) {
        console.log(error)
    }
});

async function start() {
    const url = "mongodb+srv://seda1094:aaaa@cluster0-vzrkd.mongodb.net/todo";
    const PORT = process.env.PORT || 3000
    try {
        await mongoose.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false
        });
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        });
    } catch (e) {
        console.log(e)
    }
}

start()
