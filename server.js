//main things i learned from this exercise
//1 using npm run dev instead of npm, look in package.json for that
//"dev" : "nodemon server.js" use `npm run dev` to run this
//why? because the "start" command is what heroku is going to use, you dont want nodemon in there
//2. using .save() 
// look in app.put("/todo/:id", async (req,res) => { for the .save()
//3. in create, he passes an array of three objects that fit schema at the same time


//dependos
require("dotenv").config() //this loads the .env environment variables, should be first!
const express = require('express')
// const mongoose = require('mongoose') //an obj document manager (works with db) // this is imported in connection/Todo
const methodOverride = require("method-override") //override request methods
const morgan = require("morgan") //logging
// const Todo = require("./models/Todo") //added temporarily to make Todo work//deprecated in favor of the following
const TodoRouter = require("./controllers/TodoController") //now add the app.use for this down in the mids section


//create express application
const app = express()

//middleware - app.use(whateverTheMiddleWareFunctionIs)
app.use(methodOverride("_method")) //the string "_method" is defined by you, its what you use in the url
app.use(morgan("tiny")) //every request that comes into the server, were going to log it first
app.use(express.urlencoded({extended: true})) //this parses html form bodies if you enter a form, this is where req.body comes from
app.use("/static", express.static("static")) // "/static" is the url destination, "static" is reference in your dir structure
app.use("/todo", TodoRouter) //added to use TodoRouter 

//removed routes (app.get etc) and insert router


app.listen(process.env.PORT, () => {
    console.log(`we in this ${process.env.PORT}`)
})