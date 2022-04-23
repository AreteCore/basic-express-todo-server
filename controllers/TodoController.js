//dependencies
const express = require('express') //router constructor is built into express
const router = express.Router() //this is the router
// const Todo = require("../models/Todo") //this adds Todo //deprecated in favor of TodoActions
const TodoActions = require("./TodoActions")

//these were all changed from app.get etc to router.get etc

//routes
//these are all now "/" and "/asdf" because of the app.use("/todo",TodoRouter) in server.js
router.get("/",  TodoActions.index)

router.get("/seed", TodoActions.seed)

router.post("/", TodoActions.create)

router.put("/:id", TodoActions.update)

//now export router
module.exports = router
