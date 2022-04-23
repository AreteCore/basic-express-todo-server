//dependencies
const express = require('express') //router constructor is built into express
const router = express.Router() //this is the router
const Todo = require("../models/Todo") //this adds Todo

//these were all changed from app.get etc to router.get etc

//routes
//these are all now "/" and "/asdf" because of the app.use("/todo",TodoRouter) in server.js
router.get("/",  async (req,res) => {
    //get todos
    const todos = await Todo.find({}).catch((err) => res.send(err))
    // render index 
    res.render("index.ejs", {todos})
})

router.get("/seed", async (req,res) => {
    await Todo.remove({})
    const todos = await Todo.create([
        {text: "blah",completed: false},
        {text: "blah2",completed: false},
        {text: "blah3",completed: true}
    ]).catch((err) => res.send(err))
    //send todos as json
    res.json(todos)
})

router.post("/", async (req,res) => {
    await Todo.create(req.body).catch((err) => res.send(err))
    res.redirect("/todo")
})

router.put("/:id", async (req,res) => {
    //get id
    let id = req.params.id
    //get todos
    const todo = await Todo.findById(id)
    //complete todo
    todo.completed = true
    await todo.save() //saves changes
    res.redirect("/todo")
})

//now export router
module.exports = router
