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


//create express application
const app = exoress()

//middleware - app.use(whateverTheMiddleWareFunctionIs)
app.use(morgan("tiny")) //every request that comes into the server, were going to log it first
app.use(express.urlencoded({extended: true})) //this parses html form bodies if you enter a form, this is where req.body comes from
app.use("/static", express.static("static")) // "/static" is the url destination, "static" is reference in your dir structure
app.use(methodOverride("_method")) //the string "_method" is defined by you, its what you use in the url