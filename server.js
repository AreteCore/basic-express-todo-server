//main things i learned from this exercise
//1 using npm run dev instead of npm, look in package.json for that
//"dev" : "nodemon server.js" use `npm run dev` to run this
//why? because the "start" command is what heroku is going to use, you dont want nodemon in there
//2. using .save() 
// look in app.put("/todo/:id", async (req,res) => { for the .save()


//dependos
require("dotenv").config() //this loads the .env environment variables, should be first!
const express = require('express')
const mongoose = require('mongoose') //an obj document manager (works with db)
const methodOverride = require("method-override") //override request methods
const morgan = require("morgan") //logging

//dbase connection
const DATABASE_URL = process.env.DATABASE_URL

//est connection
mongoose.connect(DATABASE_URL)

//save connection
const cxn = mongoose.connection
//setup messages
cxn
.on("open", () => (console.log("connection is open to mongo")))
.on("close", () => (console.log("connection is closed to mongo")))
.on("error", (err) => (console.log(err)))

//schemas models
//schema - definition of our data type
const todoSchema = new mongoose.Schema({
    text: String,
    completed: Boolean
}, {timestamps: true})

//model - the object for workign with our data type
const Todo = mongoose.model("Todo", todoSchema)

//create express application
const app = express()

//middleware - app.use(whateverTheMiddleWareFunctionIs)
app.use(methodOverride("_method")) //the string "_method" is defined by you, its what you use in the url
app.use(morgan("tiny")) //every request that comes into the server, were going to log it first
app.use(express.urlencoded({extended: true})) //this parses html form bodies if you enter a form, this is where req.body comes from
app.use("/static", express.static("static")) // "/static" is the url destination, "static" is reference in your dir structure

//routes
app.get("/",  async (req,res) => {
    //get todos
    const todos = await Todo.find({}).catch((err) => res.send(err))
    // render index 
    res.render("index.ejs", {todos})
})

app.get("/todo/seed", async (req,res) => {
    await Todo.remove({})
    const todos = await Todo.create([
        {text: "blah",completed: false},
        {text: "blah2",completed: false},
        {text: "blah3",completed: true}
    ]).catch((err) => res.send(err))
    //send todos as json
    res.json(todos)
})

app.post("/todo", async (req,res) => {
    await Todo.create(req.body).catch((err) => res.send(err))
    res.redirect("/")
})

app.put("/todo/:id", async (req,res) => {
    //get id
    let id = req.params.id
    //get todos
    const todo = await Todo.findById(id)
    //complete todo
    todo.completed = true
    await todo.save() //saves changes
    res.redirect("/")
})

app.listen(process.env.PORT, () => {
    console.log(`we in this ${process.env.PORT}`)
})