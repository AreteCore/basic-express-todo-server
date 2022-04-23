// dependencies
const Todo = require("../models/Todo")

const actions = {}

actions.index = async (req,res) => {
    //get todos
    const todos = await Todo.find({}).catch((err) => res.send(err))
    // render index 
    res.render("index.ejs", {todos})
}

actions.seed = async (req,res) => {
    await Todo.remove({})
    const todos = await Todo.create([
        {text: "blah",completed: false},
        {text: "blah2",completed: false},
        {text: "blah3",completed: true}
    ]).catch((err) => res.send(err))
    //send todos as json
    res.json(todos)
}

actions.create = async (req,res) => {
    await Todo.create(req.body).catch((err) => res.send(err))
    res.redirect("/todo")
}

actions.update = async (req,res) => {
    //get id
    let id = req.params.id
    //get todos
    const todo = await Todo.findById(id)
    //complete todo
    todo.completed = true
    await todo.save() //saves changes
    res.redirect("/todo")
}

module.exports = actions //dont have to use function declarations if you export down here