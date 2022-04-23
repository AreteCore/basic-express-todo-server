//dependencies
const mongoose = require("./connection") //imports the already connected object

//schemas models
//schema - definition of our data type
const todoSchema = new mongoose.Schema({
    text: String,
    completed: Boolean
}, {timestamps: true})

//model - the object for workign with our data type
const Todo = mongoose.model("Todo", todoSchema)

module.exports = Todo